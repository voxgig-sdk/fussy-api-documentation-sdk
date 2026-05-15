# FussyApiDocumentation SDK configuration

module FussyApiDocumentationConfig
  def self.make_config
    {
      "main" => {
        "name" => "FussyApiDocumentation",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.fussy.fun",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "graph_ql" => {},
        },
      },
      "entity" => {
        "graph_ql" => {
          "fields" => [
            {
              "name" => "data",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "error",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "message",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "operation_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "query",
              "req" => true,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "variable",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 5,
            },
          ],
          "name" => "graph_ql",
          "op" => {
            "create" => {
              "name" => "create",
              "points" => [
                {
                  "method" => "POST",
                  "orig" => "/graphql",
                  "parts" => [
                    "graphql",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "create",
            },
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "operation_name",
                        "orig" => "operation_name",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "variable",
                        "orig" => "variable",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/graphql",
                  "parts" => [
                    "graphql",
                  ],
                  "select" => {
                    "exist" => [
                      "operation_name",
                      "query",
                      "variable",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FussyApiDocumentationFeatures.make_feature(name)
  end
end
