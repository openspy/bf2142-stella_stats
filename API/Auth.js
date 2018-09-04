var Profile = new (require('../OpenSpy/Profile'))();
var Session = new (require('../OpenSpy/Session'))();
var EACrypter = require('../EACrypter');
var ErrorResponse = require('./ErrorResponse');
function Auth() {
    this.crypter = new EACrypter();
}


Auth.prototype.registerMiddleware = function(req, res, next) {

    auth_buf = this.crypter.DecryptBlock(this.crypter.DecodeBuffer(req.queryParams.auth));
    req.profileid = auth_buf.readUInt32LE(8);

    var test_auth_session = req.queryParams.gsa !== undefined;
    
    req.currentTime = Math.floor(Date.now()/1000).toString(); //XXX: MOVE THIS
    
    if(req.profileid == 0) return next();

    Profile.getProfileById(req.profileid).then(function(profile) {
        req.profile = profile;
        if(test_auth_session) { //temporary, due to auth session being cut off
            console.log("USER", req.profile);
            Session.TestSessionByUserId(req.profile.user.id, req.queryParams.gsa).then(function(valid) {
                
                if(!valid) {
                    return next(ErrorResponse.InvalidSessionError());
                }
                req.session_valid = true;
                next();
                
            }, next);
        } else {
            req.session_valid = false;
            next();
        }
    })
	
}
module.exports = Auth;