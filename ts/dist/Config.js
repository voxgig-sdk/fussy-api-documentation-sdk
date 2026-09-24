"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'FussyApiDocumentation',
        slug: "fussy-api-documentation",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.fussy.fun",
        auth: {
            prefix: '',
            name: 'X-Access-Token',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            graph_ql: {},
        }
    };
    entity = {
        "graph_ql": {
            "fields": [
                {
                    "name": "data",
                    "title": "Data",
                    "type": "`$OBJECT`",
                    "short": "The result data from the GraphQL operation"
                },
                {
                    "name": "errors",
                    "title": "Errors",
                    "type": "`$ARRAY`",
                    "short": "Array of errors if the operation failed"
                },
                {
                    "name": "message",
                    "title": "Message",
                    "type": "`$STRING`"
                },
                {
                    "name": "operationName",
                    "title": "Operation Name",
                    "type": "`$STRING`",
                    "short": "Name of the operation to execute (if query contains multiple operations)"
                },
                {
                    "name": "query",
                    "title": "Query",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "GraphQL query or mutation string"
                },
                {
                    "name": "variables",
                    "title": "Variables",
                    "type": "`$OBJECT`",
                    "short": "Variables for the GraphQL query/mutation"
                }
            ],
            "name": "graph_ql",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/graphql",
                            "segments": [
                                {
                                    "lit": "graphql"
                                }
                            ],
                            "parts": [
                                "graphql"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/graphql",
                            "segments": [
                                {
                                    "lit": "graphql"
                                }
                            ],
                            "parts": [
                                "graphql"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "operation_name",
                                        "orig": "operation_name",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true
                                    },
                                    {
                                        "name": "variable",
                                        "orig": "variable",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "operation_name",
                                    "query",
                                    "variable"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map