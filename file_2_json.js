var fs = require('fs');


var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('awards_test.txt')
  });
  var object_keys;
  var entries;
  var logStream = fs.createWriteStream('log.txt', {'flags': 'a'});
  lineReader.on('line', function (line) {
    var line_data = line.split('\t');
    if(line_data[0] == 'H' ||  line_data[0] == '$') {
        if(entries) {
            logStream.write(JSON.stringify(entries));
            logStream.write('\n');
        }
        object_keys = line_data;
        object_keys.shift();
        console.log(entries);
        entries = [];
    }
    if(line_data[0] == 'D') {
        var obj = {};
        for(var i=0;i<object_keys.length;i++) {
            obj[object_keys[i]] = line_data[i+1];
        }
        entries.push(obj);
    }
  });
  lineReader.on('end', function() {
    logStream.end();
  });