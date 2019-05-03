var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
    var header = [{"asof":req.currentTime,"pid":req.profile.id}];
    if(req.query.mode == "base") {
        req.query.mode = "point";
    }

    PlayerProgress.FetchPlayerProgressData(req.profile.id, "player_progress").then(function(progress_data) {
        req.sendResponse(res, [header, progress_data[req.query.mode]]);
        next();
    }, next);
};