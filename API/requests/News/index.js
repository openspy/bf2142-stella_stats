module.exports = function(app) {
    app.get('/EA2142News/English.xml', require('./News'));
    app.get('/BF2142EANews/English.xml', require('./News'));
    app.get('/BF2142ticker/English.xml', require('./NewsTicker'));
};