var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
    var header = [{"asof":req.currentTime,"pid":req.profile.id}];

    PlayerProgress.FetchPlayerProgressData(req.profile.id, "player_progress").then(function(progress_data) {
        if(progress_data == null) return next(ErrorRespondeInstance.NoDataError());
        req.sendResponse(res, [header, progress_data[req.query.mode]]);
    }, next);
};