var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());
app.use(express.static('../ui'));


app.get('/', function(req, res) {
	res.send('hello world');
});

app.get('/news/latest', function(req, res) {
	// Simulates a slow request
	setTimeout(function() {
		res.jsonp([
			{
				headline: "This just in!", 
				date: new Date(2015, 10, 30, 8, 30), 
				body: "Yup. This is some seriously breaking news."
			}
		]);
	}, 2000);
})


app.post('/login', jsonParser, function(req, res) {
	var json = req.body;
	if (json.password === 'pass123') {
		// valid login
		json.expires = new Date();
		console.log("Successful login");//, json);
		res.json(json);
	} else {
		// die a horrible death
		console.log("Bad login");//, json);
		console.log(json.password);
		res.status(401).json({
			message: 'Invalid username or password.'
		});
	}
});


var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});