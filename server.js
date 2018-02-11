const express = require('express')
const app = express()
var fs = require('fs');
const url = require('url');

app.all("*", function(req, res, next) {
	req.queryParams = url.parse(req.originalUrl, true).query;
	next();
})

var sendError = function(res, errorCode) {
	var total = 0;
	var send_str = "E\t" + errorCode.toString() + "\n";
	res.write(send_str); total += send_str.length;
	res.write('$\t' + total + '\t$');
	res.end();
}
var sendEntries = function(res, data) {
	var total = 0;
	if(data.length > 0 && data[0].length > 0) {
		res.write('O\n'); total += 2;
		for(var i = 0;i<data.length;i++) {
			if(data[i].length > 0) {
				var keys = Object.keys(data[i][0]);
				res.write('H\t'); total += 2;
				for(var k=0;k<keys.length;k++) {
					var key_string = keys[k] + '\t';
					res.write(key_string); total += key_string.length;
				}
				res.write('\n'); total += 2;
				for(var j=0;j<data[i].length;j++) {
					res.write('D\t'); total += 2;
					for(var k=0;k<keys.length;k++) {
						var key_string = data[i][j][keys[k]] + '\t';
						res.write(key_string); total += key_string.length;
					}
					res.write('\n'); total ++;
				}
			}
		}
		res.write('$\t' + total + '\t$');
	}

	res.end();
}
app.get('/getplayerinfo.aspx', function(req, res) {
	//unlock format: page - slot - highest (2,2,2) = 2nd page, 2nd slot, has first 2 items
	var unlock_ids = [
		{"UnlockID": "115"}
		,{"UnlockID": "125"}
		,{"UnlockID": "215"}
		,{"UnlockID": "225"}
		,{"UnlockID": "315"}
		,{"UnlockID": "325"}
		,{"UnlockID": "415"}
		,{"UnlockID": "425"}
		,{"UnlockID": "516"}
		,{"UnlockID": "525"}
	];
	var send_entries = [[{"asof":"1509835654","cb":"client"}],
	[{"p.pid":"0","subaccount":"click4dylan","tid":"0","gsco":"00000004970","rnk":"43","tac":"12574","cs":"339","tt":"252671","crpt":"12700","rps":"24","resp":"13","tasl":"90427","tasm":"60141","awybt":"0","hls":"34","sasl":"0","tds":"636","win":"65","los":"85","unlc":"21","expts":"0","cpt":"76","dcpt":"89","twsc":"1653","tcd":"38","slpts":"0","tcrd":"1","md":"0","ent":"0","ent-1":"0","ent-2":"0","ent-3":"0","bp-1":"1","wtp-30":"1367","htp":"0","hkl":"0","atp":"0","akl":"0"}],
	unlock_ids];
	sendEntries(res, send_entries);
});

app.get('/getunlocksinfo.aspx', function(req, res) {
	//unlock format: page - slot - highest (2,2,2) = 2nd page, 2nd slot, has first 2 items
	var unlock_ids = [
		{"UnlockID": "115"}
		,{"UnlockID": "125"}
		,{"UnlockID": "215"}
		,{"UnlockID": "225"}
		,{"UnlockID": "315"}
		,{"UnlockID": "325"}
		,{"UnlockID": "415"}
		,{"UnlockID": "425"}
		,{"UnlockID": "516"}
		,{"UnlockID": "525"}
	];
	var send_entries = [[{"asof":"1509835654","pid":"1137", "nick": "click4dylan"}], [{"AvCred": "666"}], unlock_ids];
	sendEntries(res, send_entries);
});


Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

app.get('/getawardsinfo.aspx', function(req, res) {
	var award_data = [
		[{"pid":"1765700","nick":"click4dylan","asof":"1509835656"}],
		[
		]
	];
	var now = (Date.now()/1000).toString();
	//badges, _1 = bronze, _2 = silver, _3 = gold
	for(var i=0;i<22;i++) {
		var entry = {"award":"1"+i.pad()+"_3","level":"10","when":now,"first":"0"};
		award_data[1].push(entry);
	}
	//metals
	for(var i=0;i<22;i++) {
		var entry = {"award":"2"+i.pad(),"level":"0","when":now,"first":"0"};
		award_data[1].push(entry);
	}

	//ribbons
	for(var i=0;i<24;i++) {
		var entry = {"award":"3"+i.pad(),"level":"0","when":now,"first":"0"};
		award_data[1].push(entry);
	}

	//pins
	for(var i=0;i<24;i++) {
		var entry = {"award":"4"+i.pad(),"level":"0","when":now,"first":"0"};
		award_data[1].push(entry);
	}
	sendEntries(res, award_data);
});
/*
app.get('/getplayerprogress.aspx', function(req, res) {
	fs.createReadStream('getplayerprogress.txt').pipe(res)
});*/

app.get('/playersearch.aspx', function(req, res) {
	//fs.createReadStream('search.txt').pipe(res)
	var send_entries = [
		[{"pid": "1137", "asof": "1162863088"}],
		[{"searchpattern": "*"}],
		[{"pid": "666", "nick": "not implemented"}]
	];
	sendEntries(res, send_entries);
});

/*app.get('/selectunlock.aspx', function(req, res) {
	//fs.createReadStream('search.txt').pipe(res)
	var send_entries = [
		[{"result": "0"}],
	];
	//sendEntries(res, send_entries);
	sendError(res, 104);
});
app.get('/getleaderboard.aspx', function(req, res) {
	fs.createReadStream('getleaderboard.txt').pipe(res)
});

app.get('/BF2142EANews/English.xml', function(req, res) {
	fs.createReadStream('English.xml').pipe(res)
});*/
app.all('*', function(req, res) {
	//console.log("UNKNOWN", req.originalUrl);
	sendError(res, 0);
});

app.listen(80, () => console.log('Example app listening on port 3000!'))