var Profile = new (require('../OpenSpy/Profile'))();
function Auth() {
}


Auth.prototype.registerMiddleware = function(req, res, next) {
    req.profileid = 10002;
    req.currentTime = Math.floor(Date.now()/1000).toString(); //XXX: MOVE THIS
    Profile.getProfileById(req.profileid).then(function(profile) {
        req.profile = profile;
        next();
    })
	
}
module.exports = Auth;