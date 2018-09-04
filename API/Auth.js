var Profile = new (require('../OpenSpy/Profile'))();
//var Session = new (require('../OpenSpy/Session'))();
var EACrypter = require('../EACrypter');

function Auth() {
    this.crypter = new EACrypter();
}


Auth.prototype.registerMiddleware = function(req, res, next) {

    auth_buf = this.crypter.DecryptBlock(this.crypter.DecodeBuffer(req.queryParams.auth));
    req.profileid = auth_buf.readUInt32LE(8);

    var test_auth_session = req.queryParams.gsa !== undefined;
    
    req.currentTime = Math.floor(Date.now()/1000).toString(); //XXX: MOVE THIS

    Profile.getProfileById(req.profileid).then(function(profile) {
        req.profile = profile;
        if(test_auth_session) { //temporary, due to auth session being cut off
            req.session_valid = true;
            next();
        } else {
            req.session_valid = false;
            next();
        }
    })
	
}
module.exports = Auth;