var Leaderboard = new (require('../../OpenSpy/Leaderboard'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
    var mode = req.query.type;
    var offset = req.query.pos || "1";
    var pageKey = mode + "_" + offset;
    Leaderboard.FetchLeaderboardData(pageKey).then(function(progress_data) {
        if(progress_data == null) {
            progress_data = [];
        }
        var send_entries = [[{"asof":req.currentTime,"size":progress_data.length}], progress_data];
        req.sendResponse(res, send_entries);
    });

};