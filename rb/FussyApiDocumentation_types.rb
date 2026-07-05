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
# @!attribute [rw] error
#   @return [Array, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] operation_name
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] variable
#   @return [Hash, nil]
GraphQl = Struct.new(
  :data,
  :error,
  :message,
  :operation_name,
  :query,
  :variable,
  keyword_init: true
)

# Request payload for GraphQl#list.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] error
#   @return [Array, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] operation_name
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] variable
#   @return [Hash, nil]
GraphQlListMatch = Struct.new(
  :data,
  :error,
  :message,
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
# @!attribute [rw] error
#   @return [Array, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] operation_name
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] variable
#   @return [Hash, nil]
GraphQlCreateData = Struct.new(
  :data,
  :error,
  :message,
  :operation_name,
  :query,
  :variable,
  keyword_init: true
)

