# FussyApiDocumentation SDK feature factory

from fussyapidocumentation_sdk.feature.base_feature import FussyApiDocumentationBaseFeature
from fussyapidocumentation_sdk.feature.test_feature import FussyApiDocumentationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FussyApiDocumentationBaseFeature(),
        "test": lambda: FussyApiDocumentationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
