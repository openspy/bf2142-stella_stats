/*
<?xml version="1.0" encoding="UTF-8"?>
<news>
	<newsitem header="Последние новости" imageUrl="http://127.0.0.1/BF2142EANews/newsreader_screen.png">
		<p>News</p>		
	</newsitem>
</news>*/
var XMLWriter = require('xml-writer');

module.exports = function(req, res, next) {
	res.setHeader("Content-Type", "application/xml");
	var writer = new XMLWriter();
	writer.startDocument();
	writer.startElement("newsticker");
	writer.startElement("newsitem");
	//writer.writeAttribute("header","News Header");
	//writer.writeAttribute("timestamp",1333571201);
	writer.writeElement("p", "This is a newsticker line");
	writer.endElement();
	writer.endDocument();
    console.log("NEWS HANDLER", writer.toString());
    res.send(writer.toString());
};