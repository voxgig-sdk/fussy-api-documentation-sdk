<?php
declare(strict_types=1);

// FussyApiDocumentation SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FussyApiDocumentationMakeContext
{
    public static function call(array $ctxmap, ?FussyApiDocumentationContext $basectx): FussyApiDocumentationContext
    {
        return new FussyApiDocumentationContext($ctxmap, $basectx);
    }
}
