# FussyApiDocumentation SDK utility: feature_add
module FussyApiDocumentationUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
