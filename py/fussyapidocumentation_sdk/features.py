# FussyApiDocumentation SDK feature factory

from fussyapidocumentation_sdk.feature.base_feature import FussyApiDocumentationBaseFeature
from fussyapidocumentation_sdk.feature.ratelimit_feature import FussyApiDocumentationRatelimitFeature
from fussyapidocumentation_sdk.feature.retry_feature import FussyApiDocumentationRetryFeature
from fussyapidocumentation_sdk.feature.test_feature import FussyApiDocumentationTestFeature
from fussyapidocumentation_sdk.feature.timeout_feature import FussyApiDocumentationTimeoutFeature


_FEATURES = {
    "base": lambda: FussyApiDocumentationBaseFeature(),
    "ratelimit": lambda: FussyApiDocumentationRatelimitFeature(),
    "retry": lambda: FussyApiDocumentationRetryFeature(),
    "test": lambda: FussyApiDocumentationTestFeature(),
    "timeout": lambda: FussyApiDocumentationTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
