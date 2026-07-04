<?php
declare(strict_types=1);

// Typed models for the FussyApiDocumentation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GraphQl entity data model. */
class GraphQl
{
    public ?array $data = null;
    public ?array $error = null;
    public ?string $message = null;
    public ?string $operation_name = null;
    public string $query;
    public ?array $variable = null;
}

/** Match filter for GraphQl#list (any subset of GraphQl fields). */
class GraphQlListMatch
{
    public ?array $data = null;
    public ?array $error = null;
    public ?string $message = null;
    public ?string $operation_name = null;
    public ?string $query = null;
    public ?array $variable = null;
}

/** Match filter for GraphQl#create (any subset of GraphQl fields). */
class GraphQlCreateData
{
    public ?array $data = null;
    public ?array $error = null;
    public ?string $message = null;
    public ?string $operation_name = null;
    public ?string $query = null;
    public ?array $variable = null;
}

