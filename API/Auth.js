var Profile = new (require('../OpenSpy/Profile'))();
var Session = new (require('../OpenSpy/Session'))();
var EACrypter = require('../EACrypter');
var ErrorRespondeInstance = new (require('./ErrorResponse'))();
function Auth() {
    this.crypter = new EACrypter();
}

var stubProfile = {
    uniquenick: "stubprofile",
    id: 1000000,
    user: {id: 10000},
    nick: "stubprofile"
};
Auth.prototype.registerMiddleware = function(req, res, next) {

    if(!req.queryParams.auth) {
        req.session_valid = false;
        req.profileid = null;
        req.profile = null;
        return next();
    }
    auth_buf = this.crypter.DecryptBlock(this.crypter.DecodeBuffer(req.queryParams.auth));
    req.profileid = auth_buf.readUInt32LE(8);

    var test_auth_session = req.queryParams.gsa !== undefined;
    
    req.currentTime = Math.floor(Date.now()/1000).toString(); //XXX: MOVE THIS
    
    if(req.profileid == 0) return next();

    Profile.getProfileById(req.profileid).then(function(profile) {
        req.profile = profile;
        if(test_auth_session && profile) {
            Session.TestSessionByUserId(req.profile.user.id, req.queryParams.gsa).then(function(valid) {
                
                if(!valid) {
                    return next(ErrorResponse.InvalidSessionError());
                }
                req.session_valid = true;
                next();
                
            }, next);
        } else {
            req.session_valid = false;
            req.profile = stubProfile;
            req.profileid = stubProfile.id;
            next();
        }
    }).catch(next);
	
}
module.exports = Auth;