<?php
declare(strict_types=1);

// FussyApiDocumentation SDK utility: prepare_body

class FussyApiDocumentationPrepareBody
{
    public static function call(FussyApiDocumentationContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
