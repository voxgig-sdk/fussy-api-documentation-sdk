-- FussyApiDocumentation SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "FussyApiDocumentation",
      slug = "fussy-api-documentation",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.fussy.fun",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["graph_ql"] = {},
      },
    },
    entity = {
      ["graph_ql"] = {
        ["fields"] = {
          {
            ["name"] = "data",
            ["short"] = "The result data from the GraphQL operation",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "errors",
            ["short"] = "Array of errors if the operation failed",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "message",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "operationName",
            ["short"] = "Name of the operation to execute (if query contains multiple operations)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "query",
            ["req"] = true,
            ["short"] = "GraphQL query or mutation string",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "variables",
            ["short"] = "Variables for the GraphQL query/mutation",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "graph_ql",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/graphql",
                ["parts"] = {
                  "graphql",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "operation_name",
                      ["orig"] = "operation_name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "variable",
                      ["orig"] = "variable",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/graphql",
                ["parts"] = {
                  "graphql",
                },
                ["select"] = {
                  ["exist"] = {
                    "operation_name",
                    "query",
                    "variable",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
