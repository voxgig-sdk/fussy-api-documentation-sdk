"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GraphQlEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FUSSY_API_DOCUMENTATION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FUSSY_API_DOCUMENTATION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FussyApiDocumentationSDK.test();
        const ent = testsdk.GraphQl();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FUSSY_API_DOCUMENTATION_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'graph_ql.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "data", "req": false, "short": "The result data from the GraphQL operation", "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "errors", "req": false, "short": "Array of errors if the operation failed", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "message", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "operationName", "req": false, "short": "Name of the operation to execute (if query contains multiple operations)", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "query", "req": true, "short": "GraphQL query or mutation string", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "variables", "req": false, "short": "Variables for the GraphQL query/mutation", "type": "`$OBJECT`", "index$": 5 }], "name": "graph_ql", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /graphql", "json": "{\"operationId\":\"graphqlEndpoint\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"createForm\":{\"summary\":\"Create a new form (database)\",\"value\":{\"query\":\"mutation createForm($input: CreateFormInput!) {\\n  createForm(input: $input) {\\n    id\\n    title\\n  }\\n}\",\"variables\":{\"input\":{\"title\":\"Example Form\"}}}},\"createResponse\":{\"summary\":\"Create a response to a form\",\"value\":{\"query\":\"mutation createResponse($input: CreateResponseInput!) {\\n  createResponse(input: $input) {\\n    id\\n  }\\n}\",\"variables\":{\"input\":{\"formId\":\"form-id-here\"}}}},\"issueFussyAccessToken\":{\"summary\":\"Issue Access Token\",\"value\":{\"query\":\"mutation IssueFussyAccessToken($sessionId: String!) {\\n  issueFussyAccessToken(input: {sessionId: $sessionId}) {\\n    accessToken\\n  }\\n}\",\"variables\":{\"sessionId\":\"550e8400-e29b-41d4-a716-446655440000\"}}},\"me\":{\"summary\":\"Get current user information\",\"value\":{\"query\":\"query me { me { id name } }\"}}},\"schema\":{\"properties\":{\"operationName\":{\"description\":\"Name of the operation to execute (if query contains multiple operations)\",\"type\":\"string\"},\"query\":{\"description\":\"GraphQL query or mutation string\",\"type\":\"string\"},\"variables\":{\"additionalProperties\":true,\"description\":\"Variables for the GraphQL query/mutation\",\"type\":\"object\"}},\"required\":[\"query\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"accessTokenResponse\":{\"summary\":\"Access Token Response\",\"value\":{\"data\":{\"issueFussyAccessToken\":{\"accessToken\":\"example-access-token-string\"}}}},\"errorResponse\":{\"summary\":\"Error Response\",\"value\":{\"errors\":[{\"locations\":[{\"column\":1,\"line\":1}],\"message\":\"Authentication required\"}]}},\"meResponse\":{\"summary\":\"Current User Response\",\"value\":{\"data\":{\"me\":{\"id\":\"user-id\",\"name\":\"User Name\"}}}}},\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"description\":\"The result data from the GraphQL operation\",\"type\":\"object\"},\"errors\":{\"description\":\"Array of errors if the operation failed\",\"items\":{\"properties\":{\"locations\":{\"items\":{\"properties\":{\"column\":{\"type\":\"integer\"},\"line\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"path\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful GraphQL response\"},\"400\":{\"description\":\"Bad Request - Invalid GraphQL query or variables\"},\"401\":{\"description\":\"Unauthorized - Invalid or missing access token for protected operations\"},\"500\":{\"description\":\"Internal Server Error\"}},\"security\":[{},{\"AccessToken\":[]}],\"securitySchemes\":{\"AccessToken\":{\"description\":\"Access token obtained through the OAuth-like authentication flow. Required for mutations and user information queries (me, createForm, createResponse).\",\"in\":\"header\",\"name\":\"X-Access-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/graphql", "segments": [{ "lit": "graphql" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "operation_name", "orig": "operation_name", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "query", "orig": "query", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "variable", "orig": "variable", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /graphql", "json": "{\"operationId\":\"graphqlEndpointGet\",\"parameters\":[{\"description\":\"GraphQL query string\",\"in\":\"query\",\"name\":\"query\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"JSON-encoded variables object\",\"in\":\"query\",\"name\":\"variables\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Operation name to execute\",\"in\":\"query\",\"name\":\"operationName\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"errors\":{\"items\":{\"properties\":{\"message\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful GraphQL response\"}},\"security\":[{},{\"AccessToken\":[]}],\"securitySchemes\":{\"AccessToken\":{\"description\":\"Access token obtained through the OAuth-like authentication flow. Required for mutations and user information queries (me, createForm, createResponse).\",\"in\":\"header\",\"name\":\"X-Access-Token\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/graphql", "segments": [{ "lit": "graphql" }], "select": { "exist": ["operation_name", "query", "variable"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "graph_ql", "name__orig": "graph_ql", "Name": "GraphQl", "name_": "graph_ql", "name-": "graph-ql", "NAME": "GRAPH_QL", "index$": 0 }, { "active": true, "entity": "graph_ql", "key$": "BasicGraphQlFlow", "kind": "basic", "name": "BasicGraphQlFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "graph_ql_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "graph_ql_ref01" } }], "index$": 1 }] }, 'GraphQl');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const graph_ql_ref01_ent = client.GraphQl();
        let graph_ql_ref01_data = setup.data.new.graph_ql['graph_ql_ref01'];
        graph_ql_ref01_data = (await graph_ql_ref01_ent.create(graph_ql_ref01_data)).data();
        (0, node_assert_1.default)(null != graph_ql_ref01_data);
        // LIST
        const graph_ql_ref01_match = {};
        const graph_ql_ref01_list = (await graph_ql_ref01_ent.list(graph_ql_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/graph_ql/GraphQlTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FussyApiDocumentationSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['graph_ql01', 'graph_ql02', 'graph_ql03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID': idmap,
        'FUSSY_API_DOCUMENTATION_TEST_LIVE': 'FALSE',
        'FUSSY_API_DOCUMENTATION_TEST_EXPLAIN': 'FALSE',
        'FUSSY_API_DOCUMENTATION_APIKEY': '',
    });
    idmap = env['FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID'];
    const live = 'TRUE' === env.FUSSY_API_DOCUMENTATION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FussyApiDocumentationSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=GraphQlEntity.test.js.map