package = "voxgig-sdk-fussy-api-documentation"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/fussy-api-documentation-sdk.git"
}
description = {
  summary = "FussyApiDocumentation SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["fussy-api-documentation_sdk"] = "fussy-api-documentation_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
