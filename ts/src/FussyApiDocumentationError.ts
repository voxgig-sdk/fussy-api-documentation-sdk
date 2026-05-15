
import { Context } from './Context'


class FussyApiDocumentationError extends Error {

  isFussyApiDocumentationError = true

  sdk = 'FussyApiDocumentation'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FussyApiDocumentationError
}

