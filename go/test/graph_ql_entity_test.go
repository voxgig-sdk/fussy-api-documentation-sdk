package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/fussy-api-documentation-sdk/go"
	"github.com/voxgig-sdk/fussy-api-documentation-sdk/go/core"

	vs "github.com/voxgig-sdk/fussy-api-documentation-sdk/go/utility/struct"
)

func TestGraphQlEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GraphQl(nil)
		if ent == nil {
			t.Fatal("expected non-nil GraphQlEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"graph_ql": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.GraphQl(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.GraphQl(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := graph_qlBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "graph_ql." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		graphQlRef01Ent := client.GraphQl(nil)
		graphQlRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "graph_ql"}, setup.data), "graph_ql_ref01"))

		graphQlRef01DataResult, err := graphQlRef01Ent.Create(graphQlRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		graphQlRef01Data = core.ToMapAny(entityData(graphQlRef01DataResult))
		if graphQlRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		graphQlRef01Match := map[string]any{}

		graphQlRef01ListResult, err := graphQlRef01Ent.List(graphQlRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, graphQlRef01ListOk := graphQlRef01ListResult.([]any)
		if !graphQlRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", graphQlRef01ListResult)
		}

	})
}

func graph_qlBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "graph_ql", "GraphQlTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read graph_ql test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse graph_ql test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"graph_ql01", "graph_ql02", "graph_ql03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID": idmap,
		"FUSSY_API_DOCUMENTATION_TEST_LIVE":      "FALSE",
		"FUSSY_API_DOCUMENTATION_TEST_EXPLAIN":   "FALSE",
		"FUSSY_API_DOCUMENTATION_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["FUSSY_API_DOCUMENTATION_TEST_GRAPH_QL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FUSSY_API_DOCUMENTATION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["FUSSY_API_DOCUMENTATION_APIKEY"],
			},
			extra,
		})
		client = sdk.NewFussyApiDocumentationSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FUSSY_API_DOCUMENTATION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FUSSY_API_DOCUMENTATION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
