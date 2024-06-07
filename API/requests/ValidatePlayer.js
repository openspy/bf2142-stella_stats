module.exports = function(req, res, next) {
    var header = {
        "pid": null, // actual pid from session
        "nick": null, // actual nick from session
        "spid": req.queryParams.pid, // pid as passed in request
        "asof": req.currentTime
    };

    var result;
    if(req.session_valid) {
        header["pid"] = req.profileid;
        header["nick"] = req.profile.uniquenick;
        if(req.profile.uniquenick != req.queryParams.SoldierNick) {
            result = "InvalidReportedNick";
        } else if(req.profileid != req.queryParams.pid) {
            result = "InvalidReportedProfileID";
        } else {
            result = "Ok";
        }
    } else {
        // `pid` and/or `nick` need to differ from request in order to cause a kick/ban
        header["pid"] = 0;
        // `[prefix] nick` usually get cut off after 23 characters in the game's client-server protocols
        // While the limit appears to not be applied to values returned by the validation,
        // it's probably best to follow that convention/limit
        header["nick"] = ("INVALID " + req.queryParams.SoldierNick).slice(0, 23)
        result = "InvalidAuthProfileID";
    }
            
    var send_entries = [[header], [{"result": result}]];
    req.sendResponse(res, send_entries);
};
