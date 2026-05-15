-- FussyApiDocumentation SDK error

local FussyApiDocumentationError = {}
FussyApiDocumentationError.__index = FussyApiDocumentationError


function FussyApiDocumentationError.new(code, msg, ctx)
  local self = setmetatable({}, FussyApiDocumentationError)
  self.is_sdk_error = true
  self.sdk = "FussyApiDocumentation"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FussyApiDocumentationError:error()
  return self.msg
end


function FussyApiDocumentationError:__tostring()
  return self.msg
end


return FussyApiDocumentationError
