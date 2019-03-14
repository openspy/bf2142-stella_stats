var PlayerProgress = new (require('../../OpenSpy/PlayerProgress'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
    PlayerProgress.FetchPlayerProgressData(req.profile.id, "awards").then(function(progress_data) {
        if(progress_data == null || progress_data.length == 0) {
            progress_data = [
                {"award": null, "level": null, "when": null, "first": null},
            ];
        }
        var award_data = [
            [{"pid":req.profile.id,"nick":req.profile.uniquenick,"asof":req.currentTime}],
            progress_data
        ];
        req.sendResponse(res, award_data);
    });
};