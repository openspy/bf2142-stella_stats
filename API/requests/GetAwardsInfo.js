module.exports = function(req, res, next) {
    var award_data = [
        [{"pid":req.profile.id,"nick":req.profile.uniquenick,"asof":req.currentTime}],
        [
            {"award": null, "level": null, "when": null, "first": null},
        ]
    ];
    /*//badges, _1 = bronze, _2 = silver, _3 = gold
    for(var i=0;i<22;i++) {
        var entry = {"award":"1"+i.pad()+"_3","level":"10","when":req.currentTime,"first":"0"};
        award_data[1].push(entry);
    }
    //metals
    for(var i=0;i<22;i++) {
        var entry = {"award":"2"+i.pad(),"level":"0","when":req.currentTime,"first":"0"};
        award_data[1].push(entry);
    }

    //ribbons
    for(var i=0;i<24;i++) {
        var entry = {"award":"3"+i.pad(),"level":"0","when":req.currentTime,"first":"0"};
        award_data[1].push(entry);
    }

    //pins
    for(var i=0;i<24;i++) {
        var entry = {"award":"4"+i.pad(),"level":"0","when":req.currentTime,"first":"0"};
        award_data[1].push(entry);
    }*/
    req.sendResponse(res, award_data);
};