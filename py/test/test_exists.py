# ProjectName SDK exists test

import pytest
from fussyapidocumentation_sdk import FussyApiDocumentationSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FussyApiDocumentationSDK.test(None, None)
        assert testsdk is not None
