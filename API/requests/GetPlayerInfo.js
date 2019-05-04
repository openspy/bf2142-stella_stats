var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
	//unlock format: page - slot - highest (2,2,2) = 2nd page, 2nd slot, has first 2 items
	var unlock_ids = [
		{"UnlockID": "115"}
		,{"UnlockID": "125"}
		,{"UnlockID": "215"}
		,{"UnlockID": "225"}
		,{"UnlockID": "315"}
		,{"UnlockID": "325"}
		,{"UnlockID": "415"}
		,{"UnlockID": "425"}
		,{"UnlockID": "516"}
		,{"UnlockID": "525"}
	];
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
			var send_entries = [[{"asof":req.currentTime,"cb":"client"}], [player_data], unlock_ids];
			req.sendResponse(res, send_entries);
    }, next);
};