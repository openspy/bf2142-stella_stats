function ResponseWriter() {

}


ResponseWriter.prototype.sendError = function(res, error) {
	if(error.statusCode == 200) {
		console.warn(error);
	} else {
		console.error(error);
	}

	//var time = Math.floor(Date.now()/1000).toString(); //XXX: MOVE THIS
	//var send_entries = [[{"err":(error.responseCode || 999).toString(), "asof":time}]];
	//var send_entries = [[{"err":"Player Not Found!", "asof":time}]];
	//this.sendResponse(res, send_entries, 'E');
	
	var code = (error.responseCode || 999).toString();
	var len = 1 + code.length;
	var test = "E\t"+code+"\n$\t"+ len +"\t$\n";
	res.send(test).end();
};

ResponseWriter.prototype.sendResponse = function(res, data, opening) {
	var total = 0;
	var out_buff = "";
	if(data.length > 0 && data[0].length > 0) {
		out_buff += opening || 'O'; total++;
		out_buff += '\n';
		for(var i = 0;i<data.length;i++) {
			if(data[i].length > 0) {
				
				if(data[i][0].length > 0) {
					lookup_Index = 1;
				}
				var largest_keys = 0, largest_keys_index = 0;;
				//find largest keys... to supply most columns
				for(var j=0;j<data[i].length;j++) {
					if(Object.keys(data[i][j]).length > largest_keys) {
						largest_keys = Object.keys(data[i][j]).length;
						largest_keys_index = j;
					}
				}

				var keys = Object.keys(data[i][largest_keys_index]);
				
				out_buff += 'H\t'; total++;
				for(var k=0;k<keys.length;k++) {
					var key_string = keys[k] + '\t'; total += keys[k].length;
					out_buff += key_string;
				}
				out_buff += '\n';
				if(data[i][0][keys[0]] == null) continue;
				for(var j=0;j<data[i].length;j++) {
					out_buff += 'D\t'; total++;
					for(var k=0;k<keys.length;k++) {
						var key_string = data[i][j][keys[k]] + '\t'; total += data[i][j][keys[k]].length;
						out_buff += key_string;
					}
					out_buff += '\n';
				}
			}
		}
		out_buff += '$\t' + total + '\t$';
	}
	res.send(out_buff).end();
};

ResponseWriter.prototype.registerMiddleware = function(req, res, next) {
	req.sendResponse = this.sendResponse.bind(this);
	req.sendError 	 = this.sendError.bind(this);
	next();
}

module.exports = ResponseWriter;