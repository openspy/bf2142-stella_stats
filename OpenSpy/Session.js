var request = require('request-promise');
function Session(options) {
}
Session.prototype.TestSessionByProfileId = function(profileid, session_key) {
    return new Promise(function(resolve, reject) {
        var request_body = {"password": session_key};

        var headers = {'Content-Type': 'application/json', "APIKey": global.API_KEY};

        var options = {
            uri: global.API_ENDPOINT + "/v1/Auth/GetSession",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
        request.post(options).then(function(response) {
            resolve(response && response.profile && response.profile.id == profileid);
        }, reject);
    });
}

Session.prototype.TestSessionByUserId = function(userid, session_key) {
    return new Promise(function(resolve, reject) {
        var request_body = {"password": session_key};

        var headers = {'Content-Type': 'application/json', "APIKey": global.API_KEY};

        var options = {
            uri: global.API_ENDPOINT + "/v1/Auth/GetSession",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
        request.post(options).then(function(response) {
            resolve(response && response.user && response.user.id == userid);
        }, reject);
    });
}
module.exports = Session;
