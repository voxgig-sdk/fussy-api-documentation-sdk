# FussyApiDocumentation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FussyApiDocumentationFeatures
  def self.make_feature(name)
    case name
    when "base"
      FussyApiDocumentationBaseFeature.new
    when "test"
      FussyApiDocumentationTestFeature.new
    else
      FussyApiDocumentationBaseFeature.new
    end
  end
end
