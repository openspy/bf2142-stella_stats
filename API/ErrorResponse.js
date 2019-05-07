/*

[ 0, "No error" ],
[ 101, "Bad ID" ],
[ 102, "No nick" ],
[ 103, "Bad pos" ],
[ 104, "Bad \"before\" value" ],
[ 105, "Bad \"after\" value" ],
[ 106, "No profileID" ],
[ 107, "No valid profileID and no valid nickname" ],
[ 108, "Bad type" ],
[ 109, "Must have exactly one from (profileID, nickname, position)" ],
[ 110, "Must have exactly one from (profileID, nickname)" ],
[ 111, "No ID" ],
[ 112, "Bad info" ],
[ 113, "Bad army(ies)" ],
[ 114, "Bad kit(s)" ],
[ 115, "Bad map(s)" ],
[ 116, "Bad server(s)" ],
[ 117, "Bad vehicle(s)" ],
[ 118, "Bad infantry weapon(s)" ],
[ 119, "Bad army/kit/map/server/vehicle/weapon" ],
[ 120, "Error finding or running stored procedure" ],
[ 121, "Error accessing an unlockable item's status" ],
[ 122, "Player already created" ],
[ 123, "Password Required" ],
[ 124, "Password does not match players." ],
[ 125, "Invalid Country Code."]
*/
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
    errorData.statusCode = 200;
    errorData.responseCode = 104;
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
    errorData.responseCode = 112;
    errorData.errorMessage = "No data available";
    return errorData;
}
module.exports = ErrorResponse;