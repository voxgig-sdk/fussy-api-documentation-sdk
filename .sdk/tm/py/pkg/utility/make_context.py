# FussyApiDocumentation SDK utility: make_context

from projectname_sdk.core.context import FussyApiDocumentationContext


def make_context_util(ctxmap, basectx):
    return FussyApiDocumentationContext(ctxmap, basectx)
