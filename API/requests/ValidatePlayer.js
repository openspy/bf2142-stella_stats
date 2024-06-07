module.exports = function(req, res, next) {
    var header = {"asof":req.currentTime,"pid":req.profileid || null};
    var result;
    if(req.session_valid) {
        if(req.profile.uniquenick != req.queryParams.SoldierNick) {
            result = "InvalidReportedNick";
        } else if(req.profileid != req.queryParams.pid) {
            result = "InvalidReportedProfileID";
        } else {
            result = "Ok";
            header["nick"] = req.profile.uniquenick;
        }
    } else {
        result = "InvalidAuthProfileID";
    }
            
    var send_entries = [[header], [{"result": result}]];
    req.sendResponse(res, send_entries);
};
