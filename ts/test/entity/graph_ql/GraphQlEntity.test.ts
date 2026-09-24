

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FussyApiDocumentationSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GraphQlEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FUSSY_API_DOCUMENTATION_TEST_LIVE=TRUE.
  afterEach(liveDelay('FUSSY_API_DOCUMENTATION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FussyApiDocumentationSDK.test()
    const ent = testsdk.GraphQl()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FUSSY_API_DOCUMENTATION_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'graph_ql.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"sh":"The result data from the GraphQL operation","t":"`$OBJECT`","key$":"data","index$":0},"errors":{"a":true,"h":"Errors","n":"errors","r":false,"sh":"Array of errors if the operation failed","t":"`$ARRAY`","key$":"errors","index$":1},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":2},"operationName":{"a":true,"h":"Operation Name","n":"operationName","r":false,"sh":"Name of the operation to execute (if query contains multiple operations)","t":"`$STRING`","key$":"operationName","index$":3},"query":{"a":true,"h":"Query","n":"query","r":true,"sh":"GraphQL query or mutation string","t":"`$STRING`","key$":"query","index$":4},"variables":{"a":true,"h":"Variables","n":"variables","r":false,"sh":"Variables for the GraphQL query/mutation","t":"`$OBJECT`","key$":"variables","index$":5}},"name":"graph_ql","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /graphql","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/graphql","q":{},"r":{},"s":[{"lit":"graphql"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /graphql","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"operation_name","or":"operation_name","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"query","or":"query","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"variable","or":"variable","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/graphql","q":{"exist":["operation_name","query","variable"]},"r":{},"s":[{"lit":"graphql"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"graph_ql","name__orig":"graph_ql","Name":"GraphQl","name_":"graph_ql","name-":"graph-ql","NAME":"GRAPH_QL","index$":0}, {"active":true,"entity":"graph_ql","key$":"BasicGraphQlFlow","kind":"basic","name":"BasicGraphQlFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"graph_ql_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"graph_ql_ref01"}}],"index$":1}]}, 'GraphQl', {"POST /graphql":{"protocol":"http","operationId":"graphqlEndpoint","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["query"],"properties":{"query":{"type":"string","description":"GraphQL query or mutation string","key$":"query"},"variables":{"type":"object","description":"Variables for the GraphQL query/mutation","additionalProperties":true,"key$":"variables"},"operationName":{"type":"string","description":"Name of the operation to execute (if query contains multiple operations)","key$":"operationName"}},"index$":1},"examples":{"issueFussyAccessToken":{"summary":"Issue Access Token","value":{"query":"mutation IssueFussyAccessToken($sessionId: String!) {\n  issueFussyAccessToken(input: {sessionId: $sessionId}) {\n    accessToken\n  }\n}","variables":{"sessionId":"550e8400-e29b-41d4-a716-446655440000"}}},"me":{"summary":"Get current user information","value":{"query":"query me { me { id name } }"}},"createForm":{"summary":"Create a new form (database)","value":{"query":"mutation createForm($input: CreateFormInput!) {\n  createForm(input: $input) {\n    id\n    title\n  }\n}","variables":{"input":{"title":"Example Form"}}}},"createResponse":{"summary":"Create a response to a form","value":{"query":"mutation createResponse($input: CreateResponseInput!) {\n  createResponse(input: $input) {\n    id\n  }\n}","variables":{"input":{"formId":"form-id-here"}}}}}}}},"responses":{"200":{"description":"Successful GraphQL response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"type":"object","description":"The result data from the GraphQL operation","additionalProperties":true,"key$":"data"},"errors":{"type":"array","description":"Array of errors if the operation failed","items":{"type":"object","properties":{"message":{"type":"string","description":"Error message"},"locations":{"type":"array","items":{"type":"object","properties":{"line":{"type":"integer"},"column":{"type":"integer"}}}},"path":{"type":"array","items":{"type":"string"}}}},"key$":"errors"}},"index$":0},"examples":{"accessTokenResponse":{"summary":"Access Token Response","value":{"data":{"issueFussyAccessToken":{"accessToken":"example-access-token-string"}}}},"meResponse":{"summary":"Current User Response","value":{"data":{"me":{"id":"user-id","name":"User Name"}}}},"errorResponse":{"summary":"Error Response","value":{"errors":[{"message":"Authentication required","locations":[{"line":1,"column":1}]}]}}}}}},"400":{"description":"Bad Request - Invalid GraphQL query or variables"},"401":{"description":"Unauthorized - Invalid or missing access token for protected operations"},"500":{"description":"Internal Server Error"}},"parameters":[],"security":[{},{"AccessToken":[]}],"securitySource":"operation","securitySchemes":{"AccessToken":{"type":"apiKey","in":"header","name":"X-Access-Token","description":"Access token obtained through the OAuth-like authentication flow. Required for mutations and user information queries (me, createForm, createResponse)."}}},"GET /graphql":{"protocol":"http","operationId":"graphqlEndpointGet","responses":{"200":{"description":"Successful GraphQL response","content":{"application/json":{"schema":{"type":"object","properties":{"data":{"additionalProperties":true,"key$":"data","type":"object"},"errors":{"items":{"properties":{"message":{"type":"string","key$":"message"}},"type":"object","index$":0},"key$":"errors","type":"array"}}}}}}},"parameters":[{"name":"query","in":"query","required":true,"schema":{"type":"string"},"description":"GraphQL query string","index$":0},{"name":"variables","in":"query","required":false,"schema":{"type":"string"},"description":"JSON-encoded variables object","index$":1},{"name":"operationName","in":"query","required":false,"schema":{"type":"string"},"description":"Operation name to execute","index$":2}],"security":[{},{"AccessToken":[]}],"securitySource":"operation","securitySchemes":{"AccessToken":{"type":"apiKey","in":"header","name":"X-Access-Token","description":"Access token obtained through the OAuth-like authentication flow. Required for mutations and user information queries (me, createForm, createResponse)."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const graph_ql_ref01_ent = client.GraphQl()
    let graph_ql_ref01_data = setup.data.new.graph_ql['graph_ql_ref01']

    graph_ql_ref01_data = (await graph_ql_ref01_ent.create(graph_ql_ref01_data)).data()
    assert(null != graph_ql_ref01_data)


    // LIST
    const graph_ql_ref01_match: any = {}

    const graph_ql_ref01_list = (await graph_ql_ref01_ent.list(graph_ql_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/graph_ql/GraphQlTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FussyApiDocumentationSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['graph_ql01','graph_ql02','graph_ql03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID': idmap,
    'FUSSY_API_DOCUMENTATION_TEST_LIVE': 'FALSE',
    'FUSSY_API_DOCUMENTATION_TEST_EXPLAIN': 'FALSE',
    'FUSSY_API_DOCUMENTATION_APIKEY': '',
  })

  idmap = env['FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID']

  const live = 'TRUE' === env.FUSSY_API_DOCUMENTATION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FussyApiDocumentationSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.FUSSY_API_DOCUMENTATION_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FUSSY_API_DOCUMENTATION_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
