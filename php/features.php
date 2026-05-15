<?php
declare(strict_types=1);

// FussyApiDocumentation SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FussyApiDocumentationFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FussyApiDocumentationBaseFeature();
            case "test":
                return new FussyApiDocumentationTestFeature();
            default:
                return new FussyApiDocumentationBaseFeature();
        }
    }
}
