<?php
declare(strict_types=1);

// FussyApiDocumentation SDK configuration

class FussyApiDocumentationConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FussyApiDocumentation",
                "slug" => "fussy-api-documentation",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.fussy.fun",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "graph_ql" => [],
                ],
            ],
            "entity" => [
        'graph_ql' => [
          'fields' => [
            [
              'name' => 'data',
              'short' => 'The result data from the GraphQL operation',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'errors',
              'short' => 'Array of errors if the operation failed',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'message',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'operationName',
              'short' => 'Name of the operation to execute (if query contains multiple operations)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'query',
              'req' => true,
              'short' => 'GraphQL query or mutation string',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'variables',
              'short' => 'Variables for the GraphQL query/mutation',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'graph_ql',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/graphql',
                  'parts' => [
                    'graphql',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'operation_name',
                        'orig' => 'operation_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'variable',
                        'orig' => 'variable',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/graphql',
                  'parts' => [
                    'graphql',
                  ],
                  'select' => [
                    'exist' => [
                      'operation_name',
                      'query',
                      'variable',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FussyApiDocumentationFeatures::make_feature($name);
    }
}
