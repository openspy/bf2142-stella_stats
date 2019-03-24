var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
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
	var base_data = {"p.pid":req.profile.id,"subaccount":req.profile.uniquenick};
	var profileid = req.query.pid || req.profile.id;

    PlayerProgress.FetchPlayerProgressData(profileid, "player_info").then(function(progress_data) {
		if(progress_data == null) progress_data = {};
		var player_data = Object.assign({}, base_data, progress_data);
		var send_entries = [[{"asof":req.currentTime,"cb":"client"}],
		[player_data],
		unlock_ids];
		req.sendResponse(res, send_entries);
    });
};