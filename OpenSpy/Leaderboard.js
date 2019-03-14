var request = require('request-promise');
function Learderboard(options) {
}
Learderboard.prototype.FetchLeaderboardData = function(pageKey) {
    return new Promise(function(resolve, reject) {
        var request_body = {"gameLookup": {"id": global.OPENSPY_GAMEID}, "pageKey": pageKey};

        var headers = {'Content-Type': 'application/json', "APIKey": global.API_KEY};

        var options = {
            uri: global.API_ENDPOINT + "/v1/Snapshot/LookupLeaderboard",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
        request.post(options).then(function(response) {
            if(!response || response.data == null) {
                return resolve(null);
            }
            resolve(response.data);
        }, reject);
    });
}

module.exports = Learderboard;
