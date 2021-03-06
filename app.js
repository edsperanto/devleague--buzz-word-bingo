const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const buzzwords = require('./routes/buzzwords');
const buzzword = require('./routes/buzzword');
const reset = require('./routes/reset');
const my = require('./public/my');
let app = express();

app.use(bodyParser.json());
app.use('/buzzwords', buzzwords);
app.use('/buzzword', buzzword);
app.use('/reset', reset);

app.use(function(req, res, next) {
	req.setEncoding('utf8');
	next();
});

app.get('/', function(req, res, next) {
	res.type('html');
	res.status(200);
	fs.readFile('./public/index.html', 'utf8', function(err, content) {
		res.send(content);
		res.end();
	});
});

app.listen(3000, function() {
	let host = this.address().address;
	let port = this.address().port;
	console.log(`Server is listening on http://${host}:${port}`);
});