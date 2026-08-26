# FussyApiDocumentation SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FussyApiDocumentation",
            "slug": "fussy-api-documentation",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.fussy.fun",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "graph_ql": {},
            },
        },
        "entity": {
      "graph_ql": {
        "fields": [
          {
            "name": "data",
            "short": "The result data from the GraphQL operation",
            "type": "`$OBJECT`",
          },
          {
            "name": "errors",
            "short": "Array of errors if the operation failed",
            "type": "`$ARRAY`",
          },
          {
            "name": "message",
            "type": "`$STRING`",
          },
          {
            "name": "operationName",
            "short": "Name of the operation to execute (if query contains multiple operations)",
            "type": "`$STRING`",
          },
          {
            "name": "query",
            "req": True,
            "short": "GraphQL query or mutation string",
            "type": "`$STRING`",
          },
          {
            "name": "variables",
            "short": "Variables for the GraphQL query/mutation",
            "type": "`$OBJECT`",
          },
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
                  "graphql",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "query",
                      "orig": "query",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "variable",
                      "orig": "variable",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/graphql",
                "parts": [
                  "graphql",
                ],
                "select": {
                  "exist": [
                    "operation_name",
                    "query",
                    "variable",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
