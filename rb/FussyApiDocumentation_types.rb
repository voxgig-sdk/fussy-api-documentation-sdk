# frozen_string_literal: true

# Typed models for the FussyApiDocumentation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GraphQl entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] operationName
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] variables
#   @return [Hash, nil]
GraphQl = Struct.new(
  :data,
  :errors,
  :message,
  :operationName,
  :query,
  :variables,
  keyword_init: true
)

# Request payload for GraphQl#list.
#
# @!attribute [rw] operation_name
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] variable
#   @return [String, nil]
GraphQlListMatch = Struct.new(
  :operation_name,
  :query,
  :variable,
  keyword_init: true
)

# Request payload for GraphQl#create.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] errors
#   @return [Array, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] operationName
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] variables
#   @return [Hash, nil]
GraphQlCreateData = Struct.new(
  :data,
  :errors,
  :message,
  :operationName,
  :query,
  :variables,
  keyword_init: true
)

