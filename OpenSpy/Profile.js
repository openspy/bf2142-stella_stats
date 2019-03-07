var request = require('request-promise');
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
        var request_body = {};
        request_body["id"] = profileid;

        if(this.namespaceid !== undefined) {
            request_body.namespaceids = [this.namespaceid];
        }
        if(this.partnercode !== undefined) {
            request_body.partnercode = this.partnercode;
        }

        var headers = {'Content-Type': 'application/json', "APIKey": global.API_KEY};

        var options = {
            uri: global.API_ENDPOINT + "/v1/Profile/lookup",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
        request.post(options).then(function(profiles) {
            if(profiles && profiles.profiles && profiles.profiles.length > 0) {
                resolve(profiles.profiles[0]);
            } else {
                resolve(null);
            }
        }, reject)
    }.bind(this));
}

Profile.prototype.searchProfileByUniquenick = function(uniquenick_partial) {
    return new Promise(function(resolve, reject) {
        var request_body = {};
        request_body["uniquenick_like"] = uniquenick_partial;

        if(this.namespaceid !== undefined) {
            request_body.namespaceids = [this.namespaceid];
        }
        if(this.partnercode !== undefined) {
            request_body.partnercode = this.partnercode;
        }

        var headers = {'Content-Type': 'application/json', "APIKey": global.API_KEY};

        var options = {
            uri: global.API_ENDPOINT + "/v1/Profile/lookup",
            method: "POST",
            body: request_body,
            headers: headers,
            json: true
        };
        request.post(options).then(function(profiles) {
            if(profiles && profiles.profiles && profiles.profiles.length > 0) {
                resolve(profiles.profiles[0]);
            } else {
                resolve(null);
            }
        }, reject)
    }.bind(this));
}
module.exports = Profile;