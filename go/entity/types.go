// Typed models for the FussyApiDocumentation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// GraphQl is the typed data model for the graph_ql entity.
type GraphQl struct {
	Data *map[string]any `json:"data,omitempty"`
	Error *[]any `json:"error,omitempty"`
	Message *string `json:"message,omitempty"`
	OperationName *string `json:"operation_name,omitempty"`
	Query string `json:"query"`
	Variable *map[string]any `json:"variable,omitempty"`
}

// GraphQlListMatch mirrors the graph_ql fields as an all-optional match
// filter (Go analog of Partial<GraphQl>).
type GraphQlListMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Error *[]any `json:"error,omitempty"`
	Message *string `json:"message,omitempty"`
	OperationName *string `json:"operation_name,omitempty"`
	Query *string `json:"query,omitempty"`
	Variable *map[string]any `json:"variable,omitempty"`
}

// GraphQlCreateData mirrors the graph_ql fields as an all-optional match
// filter (Go analog of Partial<GraphQl>).
type GraphQlCreateData struct {
	Data *map[string]any `json:"data,omitempty"`
	Error *[]any `json:"error,omitempty"`
	Message *string `json:"message,omitempty"`
	OperationName *string `json:"operation_name,omitempty"`
	Query *string `json:"query,omitempty"`
	Variable *map[string]any `json:"variable,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
