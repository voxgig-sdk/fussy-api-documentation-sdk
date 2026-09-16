# FussyApiDocumentation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FussyApiDocumentationFeatures
  def self.make_feature(name)
    case name
    when "base"
      FussyApiDocumentationBaseFeature.new
    when "ratelimit"
      FussyApiDocumentationRatelimitFeature.new
    when "retry"
      FussyApiDocumentationRetryFeature.new
    when "test"
      FussyApiDocumentationTestFeature.new
    when "timeout"
      FussyApiDocumentationTimeoutFeature.new
    else
      FussyApiDocumentationBaseFeature.new
    end
  end
end
