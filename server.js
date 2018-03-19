//imports
const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    maker = require('./dataMaker');

//router
app.use(express.static(__dirname + '/public'));

//listen
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log('server is running on port %d', port);
});