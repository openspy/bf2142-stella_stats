module.exports = function(req, res, next) {
    var send_entries = [[{"asof":req.currentTime,"pid":req.profile.id, "nick": req.profile.uniquenick}], [{"result": "OK"}]];
    req.sendResponse(res, send_entries);
};