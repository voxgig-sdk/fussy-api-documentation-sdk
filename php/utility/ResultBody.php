<?php
declare(strict_types=1);

// FussyApiDocumentation SDK utility: result_body

class FussyApiDocumentationResultBody
{
    public static function call(FussyApiDocumentationContext $ctx): ?FussyApiDocumentationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
