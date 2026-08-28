// Typed models for the FussyApiDocumentation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GraphQl {
  data?: Record<string, any>
  errors?: any[]
  message?: string
  operationName?: string
  query: string
  variables?: Record<string, any>
}

export interface GraphQlListMatch {
  operation_name?: string
  query: string
  variable?: string
}

export interface GraphQlCreateData {
  data?: Record<string, any>
  errors?: any[]
  message?: string
  operationName?: string
  query: string
  variables?: Record<string, any>
}

