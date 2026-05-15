<?php
declare(strict_types=1);

// FussyApiDocumentation SDK utility: result_headers

class FussyApiDocumentationResultHeaders
{
    public static function call(FussyApiDocumentationContext $ctx): ?FussyApiDocumentationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
