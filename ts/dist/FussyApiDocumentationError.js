"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FussyApiDocumentationError = void 0;
class FussyApiDocumentationError extends Error {
    isFussyApiDocumentationError = true;
    sdk = 'FussyApiDocumentation';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.FussyApiDocumentationError = FussyApiDocumentationError;
//# sourceMappingURL=FussyApiDocumentationError.js.map