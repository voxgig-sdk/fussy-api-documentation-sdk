<?php
declare(strict_types=1);

// FussyApiDocumentation SDK base feature

class FussyApiDocumentationBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FussyApiDocumentationContext $ctx, array $options): void {}
    public function PostConstruct(FussyApiDocumentationContext $ctx): void {}
    public function PostConstructEntity(FussyApiDocumentationContext $ctx): void {}
    public function SetData(FussyApiDocumentationContext $ctx): void {}
    public function GetData(FussyApiDocumentationContext $ctx): void {}
    public function GetMatch(FussyApiDocumentationContext $ctx): void {}
    public function SetMatch(FussyApiDocumentationContext $ctx): void {}
    public function PrePoint(FussyApiDocumentationContext $ctx): void {}
    public function PreSpec(FussyApiDocumentationContext $ctx): void {}
    public function PreRequest(FussyApiDocumentationContext $ctx): void {}
    public function PreResponse(FussyApiDocumentationContext $ctx): void {}
    public function PreResult(FussyApiDocumentationContext $ctx): void {}
    public function PreDone(FussyApiDocumentationContext $ctx): void {}
    public function PreUnexpected(FussyApiDocumentationContext $ctx): void {}
}
