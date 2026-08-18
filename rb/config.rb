# FussyApiDocumentation SDK configuration

module FussyApiDocumentationConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
          "prefix" => "",
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
              "type" => "`$OBJECT`",
            },
            {
              "name" => "errors",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "message",
              "type" => "`$STRING`",
            },
            {
              "name" => "operationName",
              "type" => "`$STRING`",
            },
            {
              "name" => "query",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "variables",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "graph_ql",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/graphql",
                  "parts" => [
                    "graphql",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "operation_name",
                        "orig" => "operation_name",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "variable",
                        "orig" => "variable",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
