module.exports = function(app) {
    
    app.get('/getawardsinfo.aspx', require('./GetAwardsInfo'));
    app.get('/getbackendinfo.aspx', require('./GetBackendinfo'));
    app.get('/getleaderboard.aspx', require('./GetLeaderboard'));

    app.get('/getplayerinfo.aspx', require('./GetPlayerInfo'));
    app.get('/getplayerprogress.aspx', require('./GetPlayerProgress'));
    
    
    app.get('/getrankinfo.aspx', require('./GetRankInfo'));    
    app.get('/getunlocksinfo.aspx', require('./GetUnlocksInfo'));

    app.get('/playersearch.aspx', require('./PlayerSearch'));
    app.get('/rankchange.aspx', require('./RankChange'));
    app.get('/selectunlock.aspx', require('./SelectUnlock'));

    app.get('/validateplayer.aspx', require('./ValidatePlayer'));
};