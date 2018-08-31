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
	var send_entries = [[{"asof":req.currentTime,"pid":req.profile.id, "nick": req.profile.uniquenick}], [{"AvCred": "0"}], unlock_ids];
	req.sendResponse(res, send_entries);
};