<?php
declare(strict_types=1);

// FussyApiDocumentation SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

FussyApiDocumentationUtility::setRegistrar(function (FussyApiDocumentationUtility $u): void {
    $u->clean = [FussyApiDocumentationClean::class, 'call'];
    $u->done = [FussyApiDocumentationDone::class, 'call'];
    $u->make_error = [FussyApiDocumentationMakeError::class, 'call'];
    $u->feature_add = [FussyApiDocumentationFeatureAdd::class, 'call'];
    $u->feature_hook = [FussyApiDocumentationFeatureHook::class, 'call'];
    $u->feature_init = [FussyApiDocumentationFeatureInit::class, 'call'];
    $u->fetcher = [FussyApiDocumentationFetcher::class, 'call'];
    $u->make_fetch_def = [FussyApiDocumentationMakeFetchDef::class, 'call'];
    $u->make_context = [FussyApiDocumentationMakeContext::class, 'call'];
    $u->make_options = [FussyApiDocumentationMakeOptions::class, 'call'];
    $u->make_request = [FussyApiDocumentationMakeRequest::class, 'call'];
    $u->make_response = [FussyApiDocumentationMakeResponse::class, 'call'];
    $u->make_result = [FussyApiDocumentationMakeResult::class, 'call'];
    $u->make_point = [FussyApiDocumentationMakePoint::class, 'call'];
    $u->make_spec = [FussyApiDocumentationMakeSpec::class, 'call'];
    $u->make_url = [FussyApiDocumentationMakeUrl::class, 'call'];
    $u->param = [FussyApiDocumentationParam::class, 'call'];
    $u->prepare_auth = [FussyApiDocumentationPrepareAuth::class, 'call'];
    $u->prepare_body = [FussyApiDocumentationPrepareBody::class, 'call'];
    $u->prepare_headers = [FussyApiDocumentationPrepareHeaders::class, 'call'];
    $u->prepare_method = [FussyApiDocumentationPrepareMethod::class, 'call'];
    $u->prepare_params = [FussyApiDocumentationPrepareParams::class, 'call'];
    $u->prepare_path = [FussyApiDocumentationPreparePath::class, 'call'];
    $u->prepare_query = [FussyApiDocumentationPrepareQuery::class, 'call'];
    $u->result_basic = [FussyApiDocumentationResultBasic::class, 'call'];
    $u->result_body = [FussyApiDocumentationResultBody::class, 'call'];
    $u->result_headers = [FussyApiDocumentationResultHeaders::class, 'call'];
    $u->transform_request = [FussyApiDocumentationTransformRequest::class, 'call'];
    $u->transform_response = [FussyApiDocumentationTransformResponse::class, 'call'];
});
