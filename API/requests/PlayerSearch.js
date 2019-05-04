var ProfileSearch = new (require('../../OpenSpy/Profile'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
	ProfileSearch.searchProfileByUniquenick(req.queryParams.nick).then(function(profiles) {
		var results = [];
		if(profiles) {
			
			for(profile of profiles) {
				var obj = {pid: profile.id, nick: profile.uniquenick};
				results.push(obj);
			}
		}
		var send_entries = [
			[{"pid": req.profileid, "asof": req.currentTime}],
			[{"searchpattern": "*"}],
			results
		];
		req.sendResponse(res, send_entries);
	}, next);
};