<?php
declare(strict_types=1);

// FussyApiDocumentation SDK utility: feature_add

class FussyApiDocumentationFeatureAdd
{
    public static function call(FussyApiDocumentationContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
