# GraphQl entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from fussyapidocumentation_sdk import FussyApiDocumentationSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestGraphQlEntity:

    def test_should_create_instance(self):
        testsdk = FussyApiDocumentationSDK.test(None, None)
        ent = testsdk.GraphQl(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _graph_ql_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "graph_ql." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set FUSSYAPIDOCUMENTATION_TEST_GRAPH_QL_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        graph_ql_ref01_ent = client.GraphQl(None)
        graph_ql_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.graph_ql"), "graph_ql_ref01"))

        graph_ql_ref01_data_result, err = graph_ql_ref01_ent.create(graph_ql_ref01_data, None)
        assert err is None
        graph_ql_ref01_data = helpers.to_map(graph_ql_ref01_data_result)
        assert graph_ql_ref01_data is not None

        # LIST
        graph_ql_ref01_match = {}

        graph_ql_ref01_list_result, err = graph_ql_ref01_ent.list(graph_ql_ref01_match, None)
        assert err is None
        assert isinstance(graph_ql_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(graph_ql_ref01_list_result),
            {"id": graph_ql_ref01_data["id"]})
        assert not vs.isempty(found_item)



def _graph_ql_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/graph_ql/GraphQlTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = FussyApiDocumentationSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["graph_ql01", "graph_ql02", "graph_ql03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "FUSSYAPIDOCUMENTATION_TEST_GRAPH_QL_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "FUSSYAPIDOCUMENTATION_TEST_GRAPH_QL_ENTID": idmap,
        "FUSSYAPIDOCUMENTATION_TEST_LIVE": "FALSE",
        "FUSSYAPIDOCUMENTATION_TEST_EXPLAIN": "FALSE",
        "FUSSYAPIDOCUMENTATION_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("FUSSYAPIDOCUMENTATION_TEST_GRAPH_QL_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("FUSSYAPIDOCUMENTATION_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("FUSSYAPIDOCUMENTATION_APIKEY"),
            },
            extra or {},
        ])
        client = FussyApiDocumentationSDK(helpers.to_map(merged_opts))

    _live = env.get("FUSSYAPIDOCUMENTATION_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("FUSSYAPIDOCUMENTATION_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
