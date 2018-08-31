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
	var send_entries = [[{"asof":req.currentTime,"cb":"client"}],
	[{"p.pid":req.profile.id,"subaccount":req.profile.uniquenick,"tid":"0","gsco":"00000004970","rnk":"43","tac":"12574","cs":"339","tt":"252671","crpt":"12700","rps":"24","resp":"13","tasl":"90427","tasm":"60141","awybt":"0","hls":"34","sasl":"0","tds":"636","win":"65","los":"85","unlc":"21","expts":"0","cpt":"76","dcpt":"89","twsc":"1653","tcd":"38","slpts":"0","tcrd":"1","md":"0","ent":"0","ent-1":"0","ent-2":"0","ent-3":"0","bp-1":"1","wtp-30":"1367","htp":"0","hkl":"0","atp":"0","akl":"0"}],
	unlock_ids];
	req.sendResponse(res, send_entries);
};