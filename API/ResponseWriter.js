function ResponseWriter() {

}


ResponseWriter.prototype.sendError = function(res, error) {
	console.error(error);
	var total = 0;
	var send_str = "E\t" + (error.responseCode || 999) + "\n";
	res.status(error.statusCode);
	total += send_str.length;
	send_str += '$\t' + total + '\t$';
	res.send(send_str).end();
};

ResponseWriter.prototype.sendResponse = function(res, data) {
	var total = 0;
	var out_buff = "";
	if(data.length > 0 && data[0].length > 0) {
		out_buff += 'O\n';
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
				
				out_buff += 'H\t';
				for(var k=0;k<keys.length;k++) {
					var key_string = keys[k] + '\t';
					out_buff += key_string;
				}
				out_buff += '\n';
				if(data[i][0][keys[0]] == null) continue;
				for(var j=0;j<data[i].length;j++) {
					out_buff += 'D\t';
					for(var k=0;k<keys.length;k++) {
						var key_string = data[i][j][keys[k]] + '\t';
						out_buff += key_string;
					}
					out_buff += '\n';
				}
			}
		}
		total = out_buff.length;
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