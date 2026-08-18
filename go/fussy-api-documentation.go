package voxgigfussyapidocumentationsdk

import (
	"github.com/voxgig-sdk/fussy-api-documentation-sdk/go/core"
	"github.com/voxgig-sdk/fussy-api-documentation-sdk/go/entity"
	"github.com/voxgig-sdk/fussy-api-documentation-sdk/go/feature"
	_ "github.com/voxgig-sdk/fussy-api-documentation-sdk/go/utility"
)

// Type aliases preserve external API.
type FussyApiDocumentationSDK = core.FussyApiDocumentationSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FussyApiDocumentationEntity = core.FussyApiDocumentationEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FussyApiDocumentationError = core.FussyApiDocumentationError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGraphQlEntityFunc = func(client *core.FussyApiDocumentationSDK, entopts map[string]any) core.FussyApiDocumentationEntity {
		return entity.NewGraphQlEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFussyApiDocumentationSDK = core.NewFussyApiDocumentationSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewFussyApiDocumentationSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *FussyApiDocumentationSDK  { return NewFussyApiDocumentationSDK(nil) }
func Test() *FussyApiDocumentationSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
