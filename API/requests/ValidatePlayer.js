module.exports = function(req, res, next) {
    var header = {"asof":req.currentTime,"pid":req.profileid || null};
    if(req.session_valid) {
        if(req.profile.uniquenick != req.queryParams.SoldierNick || req.profileid != req.queryParams.pid) {
            req.session_valid = false;
        }
        header["nick"] = req.profile.uniquenick;
    }
            
    var send_entries = [[header], [{"result": req.session_valid ? "OK" : "NAK"}]];
    req.sendResponse(res, send_entries);
};