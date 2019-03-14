var request = require('request-promise');
function PlayerProgress(options) {
}
PlayerProgress.prototype.FetchPlayerProgressData = function(profileid, pageKey) {
    return new Promise(function(resolve, reject) {
        var request_body = {"gameLookup": {"id": global.OPENSPY_GAMEID}, "profileLookup": {"id": profileid}, "pageKey": pageKey};

        var headers = {'Content-Type': 'application/json', "APIKey": global.API_KEY};

        var options = {
            uri: global.API_ENDPOINT + "/v1/Snapshot/LookupPlayerProgress",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
            request.post(options).then(function(response) {
            if(!response || response.length == 0  || !response[0].data) {
                return resolve(null);
            }
            resolve(response[0].data);
        }, reject);
    });
}

module.exports = PlayerProgress;