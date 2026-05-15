# FussyApiDocumentation SDK utility: make_context
require_relative '../core/context'
module FussyApiDocumentationUtilities
  MakeContext = ->(ctxmap, basectx) {
    FussyApiDocumentationContext.new(ctxmap, basectx)
  }
end
