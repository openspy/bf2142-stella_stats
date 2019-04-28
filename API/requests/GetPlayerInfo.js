var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
	var profileid = req.query.pid || req.profile.id;
	var mode = req.query.mode || null;
	var pageKey = "player_info";
	if(mode != null) {
		pageKey += "_" + mode;
	}
    PlayerProgress.FetchPlayerProgressData(profileid, pageKey).then(function(progress_data) {
		if(progress_data == null) progress_data = {};
		var player_data = Object.assign({}, progress_data);
		var send_entries = [[{"asof":req.currentTime,"cb":"client"}],
		[player_data]];
		req.sendResponse(res, send_entries);
    });
};