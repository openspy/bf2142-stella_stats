function ErrorResponse(error) {
    this.error = error;
}
ErrorResponse.prototype.NotImplementedError = function() {
    Error.captureStackTrace(this, this.constructor);
    var errorData = {};
    errorData.errorCode = 1;
    errorData.errorMessage = "Not Implemented";
    return errorData;
}

ErrorResponse.prototype.NotFoundError = function() {
    Error.captureStackTrace(this, this.constructor);
    var errorData = {};
    errorData.errorCode = 404;
    errorData.errorMessage = "Not Found";
    return errorData;
}

module.exports = new ErrorResponse();