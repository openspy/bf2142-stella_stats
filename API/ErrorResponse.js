function ErrorResponse(error) {
    this.error = error;
}
ErrorResponse.prototype.NotImplementedError = function() {
    Error.captureStackTrace(this, this.constructor);
    var errorData = {};
    errorData.statusCode = 1;
    errorData.responseCode = errorData.statusCode;
    errorData.errorMessage = "Not Implemented";
    return errorData;
}

ErrorResponse.prototype.InvalidSessionError = function() {
    Error.captureStackTrace(this, this.constructor);
    var errorData = {};
    errorData.statusCode = 400;
    errorData.responseCode = errorData.statusCode;
    errorData.errorMessage = "Invalid Session Error";
    return errorData;
}

ErrorResponse.prototype.NotFoundError = function() {
    Error.captureStackTrace(this, this.constructor);
    var errorData = {};
    errorData.statusCode = 404;
    errorData.responseCode = errorData.statusCode;
    errorData.errorMessage = "Not Found";
    return errorData;
}
ErrorResponse.prototype.SystemError = function(original_error) {
    Error.captureStackTrace(this, this.constructor);
    var errorData = {};
    errorData.statusCode = 500;
    errorData.responseCode = 999;
    errorData.errorMessage = "System Error";
    return errorData;
}

ErrorResponse.prototype.NoDataError = function(original_error) {
    Error.captureStackTrace(this, this.constructor);
    var errorData = {};
    errorData.statusCode = 200;
    errorData.responseCode = 104;
    errorData.errorMessage = "No data available";
    return errorData;
}
module.exports = ErrorResponse;