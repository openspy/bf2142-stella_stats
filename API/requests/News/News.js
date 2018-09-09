/*
<?xml version="1.0" encoding="UTF-8"?>
<news>
	<newsitem header="Последние новости" imageUrl="http://127.0.0.1/BF2142EANews/newsreader_screen.png">
		<p>News</p>		
		<p>Welcome!</p>		
	</newsitem>
</news>*/
var XMLWriter = require('xml-writer');

module.exports = function(req, res, next) {
	res.setHeader("Content-Type", "application/xml");
	var writer = new XMLWriter();
	writer.startDocument();
	writer.startElement("news");
	writer.startElement("newsitem");
	writer.writeAttribute("header","News Header");
	writer.writeAttribute("timestamp",1333571201);
	writer.writeElement("p", "This is a news line");
	writer.writeElement("p", "This aswell");
	writer.endElement();
	writer.endDocument();
    res.send(writer.toString());
};