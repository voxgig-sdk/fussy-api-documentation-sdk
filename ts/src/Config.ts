
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'FussyApiDocumentation',
        slug: "fussy-api-documentation",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.fussy.fun",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      graph_ql: {
      },

    }
  }


  entity = {
    "graph_ql": {
      "fields": [
        {
          "name": "data",
          "short": "The result data from the GraphQL operation",
          "type": "`$OBJECT`"
        },
        {
          "name": "errors",
          "short": "Array of errors if the operation failed",
          "type": "`$ARRAY`"
        },
        {
          "name": "message",
          "type": "`$STRING`"
        },
        {
          "name": "operationName",
          "short": "Name of the operation to execute (if query contains multiple operations)",
          "type": "`$STRING`"
        },
        {
          "name": "query",
          "req": true,
          "short": "GraphQL query or mutation string",
          "type": "`$STRING`"
        },
        {
          "name": "variables",
          "short": "Variables for the GraphQL query/mutation",
          "type": "`$OBJECT`"
        }
      ],
      "name": "graph_ql",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/graphql",
              "parts": [
                "graphql"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "operation_name",
                    "orig": "operation_name",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "query",
                    "orig": "query",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "variable",
                    "orig": "variable",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/graphql",
              "parts": [
                "graphql"
              ],
              "select": {
                "exist": [
                  "operation_name",
                  "query",
                  "variable"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

