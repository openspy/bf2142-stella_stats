var request = require('request-promise');
const USERPROFILE_API_KEY = "6f3c0f25-c931-4fd8-b724-e3a534d6cc44";
const OPENSPY_API_ENDPOINT = "http://api.openspy.net";
function Profile(options) {
    if(options) {
        if(options.namespaceid !== undefined) {
            this.namespaceid = options.namespaceid;
        }
        if(options.partnercode !== undefined) {
            this.partnercode = options.partnercode;
        }
    }
}
Profile.prototype.getProfileById = function(profileid) {
    return new Promise(function(resolve, reject) {
        var request_body = {"mode": "profile_search", profile: {id: profileid}, user: {}};
        if(this.namespaceid !== undefined) {
            request_body.profile.namespaceid = this.namespaceid;
        }
        if(this.partnercode !== undefined) {
            request_body.user.partnercode = this.partnercode;
        }
        var headers = {'Content-Type': 'application/json', "APIKey": USERPROFILE_API_KEY};

        var options = {
            uri: OPENSPY_API_ENDPOINT + "/backend/userprofile",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
        request.post(options).then(function(profiles) {
            if(profiles && profiles.profiles) {
                resolve(profiles.profiles[0]);
            } else {
                resolve(null);
            }
        }, reject)
    });
}

Profile.prototype.searchProfileByUniquenick = function(uniquenick_partial) {
    return new Promise(function(resolve, reject) {
        var request_body = {"mode": "profile_search", profile: {uniquenick_like: uniquenick_partial}, user: {}};
        if(this.namespaceid !== undefined) {
            request_body.profile.namespaceid = this.namespaceid;
        }
        if(this.partnercode !== undefined) {
            request_body.user.partnercode = this.partnercode;
        }
        var headers = {'Content-Type': 'application/json', "APIKey": USERPROFILE_API_KEY};

        var options = {
            uri: OPENSPY_API_ENDPOINT + "/backend/userprofile",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
        request.post(options).then(function(profiles) {
            if(profiles && profiles.profiles) {
                resolve(profiles.profiles);
            } else {
                resolve(null);
            }
        }, reject)
    });
}
module.exports = Profile;