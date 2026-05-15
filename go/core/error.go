package core

type FussyApiDocumentationError struct {
	IsFussyApiDocumentationError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFussyApiDocumentationError(code string, msg string, ctx *Context) *FussyApiDocumentationError {
	return &FussyApiDocumentationError{
		IsFussyApiDocumentationError: true,
		Sdk:              "FussyApiDocumentation",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FussyApiDocumentationError) Error() string {
	return e.Msg
}
