var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
    PlayerProgress.SetPlayerProgressKey(req.profile.id, "player_info", {"data.rnkcg": 0}).then(function(progress_data) {
        PlayerProgress.SetPlayerProgressKey(req.profile.id, "player_info_base", {"data.rnkcg": 0}).then(function(progress_data) {
            var send_entries = [[{"asof":req.currentTime,"pid":req.profile.id, "nick": req.profile.uniquenick}], [{"result": "OK"}]];
            req.sendResponse(res, send_entries);
        }, next);
    }, next);

};