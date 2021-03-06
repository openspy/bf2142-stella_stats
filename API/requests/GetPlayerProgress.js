var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
const ErrorResponse = require('../../API/ErrorResponse');
const ErrorResponseInstance = new ErrorResponse;
module.exports = function(req, res, next) {
    var header = [{"asof":req.currentTime,"pid":req.profile.id}];

    var key = "player_progress_" + req.query.mode;
    PlayerProgress.FetchPlayerProgressData(req.profile.id, key).then(function(progress_data) {
        if(progress_data == null) return next(ErrorResponseInstance.NoDataError());
        req.sendResponse(res, [header, progress_data]);
    }, next);
};