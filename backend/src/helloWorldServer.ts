import express from 'express';

const app = express();
app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.get('/kupa', function(req, res) {
	res.send('Hello World! z kupą!');
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
