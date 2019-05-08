var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
    PlayerProgress.FetchPlayerProgressData(req.profileid, "awards").then(function(progress_data) {
        if(progress_data == null || progress_data.length == 0) {
            progress_data = [
                {"award": null, "level": null, "when": null, "first": null},
            ];
        }
        var default_info = {"pid": 0, "nick": "Stub Account"};
        if(req.profile) {
            default_info.nick = req.profile.uniquenick;
            default_info.pid = req.profileid;
        }
            
        var award_data = [
            [{"pid":default_info.pid,"nick":default_info.nick,"asof":req.currentTime}],
            progress_data
        ];
        req.sendResponse(res, award_data);
    }, next);
};