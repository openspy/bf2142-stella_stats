var Leaderboard = new (require('../../OpenSpy/Leaderboard'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
const ErrorResponse = require('../../API/ErrorResponse');
const ErrorResponseInstance = new ErrorResponse;
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
	var profileid = req.profile.id;
	var mode = req.query.mode || null;
	var pageKey = "player_info";
	if(mode != null) {
		pageKey += "_" + mode;
	}

	var outputData = function(progress_data) {
		var player_data = Object.assign({nick: progress_data.subaccount, subaccount: progress_data.nick}, progress_data);
		if(req.query.pid) {
			PlayerProgress.FetchPlayerProgressData(parseInt(req.query.pid), pageKey).then(function(lookup_data) {
				var lookup_player_data = Object.assign({nick: lookup_data.subaccount, subaccount: lookup_data.nick}, lookup_data);
				var send_entries = [[{"asof":req.currentTime,"cb":"client"}], [player_data, lookup_player_data]];
				req.sendResponse(res, send_entries);
			});
			
		} else {
			var send_entries = [[{"asof":req.currentTime,"cb":"client"}], [player_data], unlock_ids];
			req.sendResponse(res, send_entries);
		}
	}

    PlayerProgress.FetchPlayerProgressData(profileid, pageKey).then(function(progress_data) {
		if(progress_data == null)  {
			var leaderboardOptions = {};
            leaderboardOptions.pageOffset = 0;
            leaderboardOptions.baseKey = pageKey;
            leaderboardOptions.pageSize = 1;
            return Leaderboard.FetchLeaderboardData(leaderboardOptions).then(function(data) {
				if(data == null || data.data.length == 0) {
					return next(ErrorResponseInstance.NoDataError());
				}
				outputData(data.data[0]);
			});
		} else {
			outputData(progress_data);
		}
			
    }, next);
};