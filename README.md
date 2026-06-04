# FussyApiDocumentation SDK

Access and manipulate a structured hobbies database via GraphQL

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About FUSSY API Documentation

The FUSSY API is a public GraphQL endpoint that exposes a structured database of hobby and otaku-related information. It is operated by Fussy Inc.

The API is served from `https://api.fussy.fun` and accepts GraphQL operations over HTTP. Clients send a GraphQL document in the request to retrieve or post hobby data.

Operational notes:

- Transport: GraphQL over HTTP at `https://api.fussy.fun/graphql`
- CORS: disabled, so browser clients will need to proxy requests
- Authentication, rate limits, and licence terms are not documented on the public catalogue page

## Try it

**TypeScript**
```bash
npm install fussy-api-documentation
```

**Python**
```bash
pip install fussy-api-documentation-sdk
```

**PHP**
```bash
composer require voxgig/fussy-api-documentation-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/fussy-api-documentation-sdk/go
```

**Ruby**
```bash
gem install fussy-api-documentation-sdk
```

**Lua**
```bash
luarocks install fussy-api-documentation-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FussyApiDocumentationSDK } from 'fussy-api-documentation'

const client = new FussyApiDocumentationSDK({})

// List all graphqls
const graphqls = await client.GraphQl().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o fussy-api-documentation-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "fussy-api-documentation": {
      "command": "/abs/path/to/fussy-api-documentation-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **GraphQl** | The single GraphQL surface for the hobbies database, served at `https://api.fussy.fun/graphql`; all queries and mutations are sent as GraphQL documents to this endpoint. | `/graphql` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from fussyapidocumentation_sdk import FussyApiDocumentationSDK

client = FussyApiDocumentationSDK({})

# List all graphqls
graphqls, err = client.GraphQl(None).list(None, None)
```

### PHP

```php
<?php
require_once 'fussyapidocumentation_sdk.php';

$client = new FussyApiDocumentationSDK([]);

// List all graphqls
[$graphqls, $err] = $client->GraphQl(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/fussy-api-documentation-sdk/go"

client := sdk.NewFussyApiDocumentationSDK(map[string]any{})

// List all graphqls
graphqls, err := client.GraphQl(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FussyApiDocumentation_sdk"

client = FussyApiDocumentationSDK.new({})

# List all graphqls
graphqls, err = client.GraphQl(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("fussy-api-documentation_sdk")

local client = sdk.new({})

-- List all graphqls
local graphqls, err = client:GraphQl(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FussyApiDocumentationSDK.test()
const result = await client.GraphQl().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FussyApiDocumentationSDK.test(None, None)
result, err = client.GraphQl(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FussyApiDocumentationSDK::test(null, null);
[$result, $err] = $client->GraphQl(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GraphQl(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FussyApiDocumentationSDK.test(nil, nil)
result, err = client.GraphQl(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GraphQl(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the FUSSY API Documentation

- Upstream: [https://api.fussy.fun](https://api.fussy.fun)
- API docs: [https://freepublicapis.com/fussy-api-documentation](https://freepublicapis.com/fussy-api-documentation)

---

Generated from the FUSSY API Documentation OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
