<?php
declare(strict_types=1);

// FussyApiDocumentation SDK exists test

require_once __DIR__ . '/../fussyapidocumentation_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FussyApiDocumentationSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
