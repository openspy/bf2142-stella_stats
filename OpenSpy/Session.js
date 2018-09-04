var request = require('request-promise');
function Session(options) {
}
Session.prototype.TestSessionByProfileId = function(profileid, session_key) {
    return new Promise(function(resolve, reject) {
        var request_body = {"mode": "test_session_profileid", profileid: profileid, session_key: session_key};

        var headers = {'Content-Type': 'application/json', "APIKey": global.API_KEY};

        var options = {
            uri: global.API_ENDPOINT + "/backend/auth",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
        request.post(options).then(function(response) {
            console.log("RESPONSE", response.valid);
            resolve(response && response.valid);
        }, reject)
    });
}

Session.prototype.TestSessionByUserId = function(userid, session_key) {
    return new Promise(function(resolve, reject) {
        var request_body = {"mode": "test_session", userid: userid, session_key: session_key};

        var headers = {'Content-Type': 'application/json', "APIKey": global.API_KEY};

        var options = {
            uri: global.API_ENDPOINT + "/backend/auth",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
        request.post(options).then(function(response) {
            resolve(response && response.valid);
        }, reject)
    });
}
module.exports = Session;
