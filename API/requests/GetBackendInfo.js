var ErrorResponse = require('../ErrorResponse');
var Leaderboard = new (require('../../OpenSpy/Leaderboard'))({namespaceid: global.PROFILE_NAMESPACEID, partnercode: global.PARTNERCODE});
module.exports = function(req, res, next) {
    Leaderboard.FetchLeaderboardData("settings").then(function(progress_data) {
        console.log(progress_data);
        var write_string = "";
        for(var i =0;i<progress_data.scores.length;i++) {
            var score_data = progress_data.scores[i];
            var str = "rankSettings.setRank " + score_data.rank + " "+ score_data.minScore + "\n";
            write_string += str;
            
        }
        var config_string = 'swiffHost.setLatestGameVersion 1.10.112.0\n' + write_string;
        for(var i =0;i<progress_data.awards.length;i++) {
            var award_data = progress_data.awards[i];
            var str = "awards.setData " + award_data.awardKey;
            for(var j=0;j<award_data.rules.length;j++) {
                var award_rule = award_data.rules[j];
                str += " \"" + award_rule+ "\"";
            }
            str += "\n";
            write_string += str;
        }
        config_string += write_string;
        var send_entries = [
            [{"asof":req.currentTime,"tid":"0", "serverip": "127.0.0.1", "cb": "client"}],
            [{"config": config_string}],
        ];
        req.sendResponse(res, send_entries);
    });
 
    
};