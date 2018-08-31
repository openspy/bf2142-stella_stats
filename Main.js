const express = require('express')
const app = express()
const url = require('url');
const ErrorResponse = require('./API/ErrorResponse');

global.PARTNERCODE = 20;
global.PROFILE_NAMESPACEID = 2;
global.ACCOUNT_NAMESPACEID = 1;
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

var ResponseWriter = new (require('./API/ResponseWriter'))();
var Auth = new (require('./API/Auth'))();
var APIRequestHandler = require('./API/requests');
app.all("*", function(req, res, next) {
    req.queryParams = url.parse(req.originalUrl, true).query;
    console.log("req",req.originalUrl);
	next();
})


function errorHandler (err, req, res, next) {
	ResponseWriter.sendError(res, err);
}

app.use(ResponseWriter.registerMiddleware.bind(ResponseWriter));
app.use(Auth.registerMiddleware.bind(Auth));

APIRequestHandler(app);


app.use(function(req, res, next) {
    next(ErrorResponse.NotFoundError());
});

app.use(errorHandler);
  

app.listen(process.env.PORT || 80, () => console.log('Example app listening on port 3000!'))

/*
var auth = "]gPnE[IZHPFMWtnZL2AJTg__";
var auth_buf = Buffer.from(auth, 'base64');
var EAEncryption = require('./EAEncryption');
var crypter = new EAEncryption();
console.log("buf is", auth_buf);
*/