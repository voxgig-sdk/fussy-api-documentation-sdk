# Typed models for the FussyApiDocumentation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GraphQl:
    query: str
    data: Optional[dict] = None
    error: Optional[list] = None
    message: Optional[str] = None
    operation_name: Optional[str] = None
    variable: Optional[dict] = None


@dataclass
class GraphQlListMatch:
    data: Optional[dict] = None
    error: Optional[list] = None
    message: Optional[str] = None
    operation_name: Optional[str] = None
    query: Optional[str] = None
    variable: Optional[dict] = None


@dataclass
class GraphQlCreateData:
    data: Optional[dict] = None
    error: Optional[list] = None
    message: Optional[str] = None
    operation_name: Optional[str] = None
    query: Optional[str] = None
    variable: Optional[dict] = None

