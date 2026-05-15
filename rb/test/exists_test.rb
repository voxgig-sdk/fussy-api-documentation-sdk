# FussyApiDocumentation SDK exists test

require "minitest/autorun"
require_relative "../FussyApiDocumentation_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FussyApiDocumentationSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
