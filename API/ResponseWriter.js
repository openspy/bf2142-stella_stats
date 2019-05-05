function ResponseWriter() {

}


ResponseWriter.prototype.sendError = function(res, error) {
	var total = 0;
	var send_str = "E\t" + error.responseCode + "\n";
	res.status(error.statusCode);
	res.write(send_str); total += send_str.length;
	res.write('$\t' + total + '\t$');
	res.end();
};

ResponseWriter.prototype.sendResponse = function(res, data) {
	var total = 0;
	if(data.length > 0 && data[0].length > 0) {
		res.write('O\n'); total += 2;
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
				
				res.write('H\t'); total += 2;
				for(var k=0;k<keys.length;k++) {
					var key_string = keys[k] + '\t';
					res.write(key_string); total += key_string.length;
				}
				res.write('\n'); total += 2;
				if(data[i][0][keys[0]] == null) continue;
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
};

ResponseWriter.prototype.registerMiddleware = function(req, res, next) {
	req.sendResponse = this.sendResponse.bind(this);
	req.sendError 	 = this.sendError.bind(this);
	next();
}

module.exports = ResponseWriter;