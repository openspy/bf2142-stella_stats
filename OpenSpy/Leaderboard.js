var request = require('request-promise');
function Learderboard() {
}
Learderboard.prototype.FetchLeaderboardData = function(requestOptions) {
    return new Promise(function(resolve, reject) {
        var request_body = {"gameLookup": {"id": global.OPENSPY_GAMEID}, "baseKey": requestOptions.baseKey};

        if(requestOptions.pageOffset !== undefined) {
            request_body["pageOffset"] = requestOptions.pageOffset;
        }

        if(requestOptions.pageSize !== undefined) {
            request_body["pageSize"] = requestOptions.pageSize;
        }

        if(requestOptions.filterData) {
            request_body["data"] = requestOptions.filterData;
        }

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
            resolve(response);
        }, reject);
    });
}

module.exports = Learderboard;
