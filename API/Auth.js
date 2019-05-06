var Profile = new (require('../OpenSpy/Profile'))();
var Session = new (require('../OpenSpy/Session'))();
var EACrypter = require('../EACrypter');

const ErrorResponse = require('../API/ErrorResponse');
const ErrorResponseInstance = new ErrorResponse;

function Auth() {
    this.crypter = new EACrypter();
}
Auth.prototype.registerMiddleware = function(req, res, next) {

    if(!req.queryParams.auth) {
        req.session_valid = false;
        req.profileid = null;
        req.profile = null;
        return next();
    }

    if(req.queryParams.auth.length == 24) {
        if( /[^a-fA-F0-9]/.test( req.queryParams.auth ) == false ) {
            return Profile.getProfileById(parseInt(req.queryParams.pid)).then(function(profile) {
                Session.TestSessionByUserId(profile.userid, req.queryParams.auth).then(function(valid) {
                    req.session_valid = valid === true;
                    if(req.session_valid) {
                        req.profileid = profile.id;
                        req.profile = profile;   
                    }
                    return next();
                });
            });
        }
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
                    return next(ErrorResponseInstance.InvalidSessionError());
                }
                req.session_valid = true;
                next();
                
            }, next);
        } else {
            req.session_valid = false;
            //req.profile = null;
            //req.profileid = null;
            next();
        }
    }).catch(next);
	
}
module.exports = Auth;