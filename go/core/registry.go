package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGraphQlEntityFunc func(client *FussyApiDocumentationSDK, entopts map[string]any) FussyApiDocumentationEntity

