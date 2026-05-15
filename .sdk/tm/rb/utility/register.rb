# FussyApiDocumentation SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FussyApiDocumentationUtility.registrar = ->(u) {
  u.clean = FussyApiDocumentationUtilities::Clean
  u.done = FussyApiDocumentationUtilities::Done
  u.make_error = FussyApiDocumentationUtilities::MakeError
  u.feature_add = FussyApiDocumentationUtilities::FeatureAdd
  u.feature_hook = FussyApiDocumentationUtilities::FeatureHook
  u.feature_init = FussyApiDocumentationUtilities::FeatureInit
  u.fetcher = FussyApiDocumentationUtilities::Fetcher
  u.make_fetch_def = FussyApiDocumentationUtilities::MakeFetchDef
  u.make_context = FussyApiDocumentationUtilities::MakeContext
  u.make_options = FussyApiDocumentationUtilities::MakeOptions
  u.make_request = FussyApiDocumentationUtilities::MakeRequest
  u.make_response = FussyApiDocumentationUtilities::MakeResponse
  u.make_result = FussyApiDocumentationUtilities::MakeResult
  u.make_point = FussyApiDocumentationUtilities::MakePoint
  u.make_spec = FussyApiDocumentationUtilities::MakeSpec
  u.make_url = FussyApiDocumentationUtilities::MakeUrl
  u.param = FussyApiDocumentationUtilities::Param
  u.prepare_auth = FussyApiDocumentationUtilities::PrepareAuth
  u.prepare_body = FussyApiDocumentationUtilities::PrepareBody
  u.prepare_headers = FussyApiDocumentationUtilities::PrepareHeaders
  u.prepare_method = FussyApiDocumentationUtilities::PrepareMethod
  u.prepare_params = FussyApiDocumentationUtilities::PrepareParams
  u.prepare_path = FussyApiDocumentationUtilities::PreparePath
  u.prepare_query = FussyApiDocumentationUtilities::PrepareQuery
  u.result_basic = FussyApiDocumentationUtilities::ResultBasic
  u.result_body = FussyApiDocumentationUtilities::ResultBody
  u.result_headers = FussyApiDocumentationUtilities::ResultHeaders
  u.transform_request = FussyApiDocumentationUtilities::TransformRequest
  u.transform_response = FussyApiDocumentationUtilities::TransformResponse
}
