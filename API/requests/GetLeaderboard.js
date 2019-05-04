var Leaderboard = new (require('../../OpenSpy/Leaderboard'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
//&ccFilter=US&buddiesFilter=10017,11012,11589&dogTagFilter=1

const ErrorResponse = require('../../API/ErrorResponse');
const ErrorRespondeInstance = new ErrorResponse;

function filterPids(filter, pids) {
    var split_pids = filter.split(',');
    var result = [];
    for(var i=0;i<split_pids.length;i++) {
        var pid = parseInt(split_pids[i]);
        if(pids.indexOf(pid) !== -1) {
            result.push(pid);
        }
    }
    return result;
}
module.exports = function(req, res, next) {
    var mode = req.query.type;
    var id = req.query.id || null;
    if(id !== null) {
        mode += "_" + id;
    }
    var offset = req.query.pos || "1";
    var leaderboardOptions = {};

    

    var fetchCurrentPlayer = function() {
        return new Promise(function(resolve, reject) {
            var fetchOptions = {baseKey: mode, filterData: {}};
            fetchOptions.filterData.pid = [ req.profile.id ];
            return Leaderboard.FetchLeaderboardData(fetchOptions).then(function(results) {
                if(results == null || results.data == null || results.data.length == 0) {
                    PlayerProgress.FetchPlayerProgressData(req.profile.id, "player_info").then(function(playerProgress) {
                        var result = {};
                        result.pid = req.profile.id;
                        result.nick = req.profile.uniquenick;
                        result.playerrank = ""+(playerProgress.rnk || "0");
                        result.countrycode = req.profile.countrycode || "US";
                        result.rank = "0";
                        result.Vet = "0";
                        resolve(result);
                    }, reject);
                } else {
                    resolve(results.data[0]);
                }
                
            });
        });
    }
    var handleResults = function(self_player, progress_data) {
        if(progress_data == null) {
            progress_data = {data: []};
        }
        var send_results = [];
        for(var i=0;i<progress_data.data.length;i++) {
            send_results.push(progress_data.data[i]);
        }

        var send_entries = [[{"size": progress_data.total, "asof":req.currentTime}]];
        if(self_player != null) {
            send_entries.push([self_player]);
        }
        send_entries.push(send_results);
        req.sendResponse(res, send_entries);
    };



    offset = parseInt(offset);
    leaderboardOptions.pageOffset = offset-1;
    leaderboardOptions.baseKey = mode;
    leaderboardOptions.pageSize = req.query.after || "17";
    leaderboardOptions.pageSize = parseInt(leaderboardOptions.pageSize);

    if(req.query.pid) {
        var pid = parseInt(req.query.pid);
        leaderboardOptions.filterData = {};
        leaderboardOptions.filterData.pid = [pid];
        return fetchCurrentPlayer().then(function(playerData) {
            return Leaderboard.FetchLeaderboardData(leaderboardOptions).then(handleResults.bind(null, playerData));
        });
        /*return Leaderboard.FetchLeaderboardData(leaderboardOptions).then(function(playerData) {
            if(playerData == null || playerData.data == null || playerData.data.length == 0) {
                return next(ErrorRespondeInstance.NoDataError());
            }
            send_entries = [[playerData.data[0]]];
            return req.sendResponse(res, send_entries);
        });*/
    }
    fetchCurrentPlayer().then(function(playerData) {
        if(req.query.dogTagFilter == "1") {
            PlayerProgress.FetchPlayerProgressData(req.profile.id, "player_dogtags").then(function(progress_data) {
                var dogtags = Object.keys(progress_data);
                var pids = [];
                leaderboardOptions.filterData = {};
                for(var i=0;i<dogtags.length;i++) {
                    pids.push(parseInt(dogtags[i]));
                }
                if(req.query.buddiesFilter !== undefined) {
                    pids = filterPids(req.query.buddiesFilter, pids);
                }
                leaderboardOptions.filterData.pid = pids;
                Leaderboard.FetchLeaderboardData(leaderboardOptions).then(handleResults.bind(null, playerData));
            });
        } else {
            if(req.query.buddiesFilter) {
                if(leaderboardOptions.filterData === undefined)
                    leaderboardOptions.filterData = {};
                var split_pids = req.query.buddiesFilter.split(',');
                var pids = [];
                for(var i=0;i<split_pids.length;i++) {
                    var pid = parseInt(split_pids[i]);
                    pids.push(pid);
                }
                leaderboardOptions.filterData.pid = pids;
            }
            Leaderboard.FetchLeaderboardData(leaderboardOptions).then(handleResults.bind(null, playerData));
        }  
    })
};