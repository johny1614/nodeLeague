import express from 'express';

const app = express();
app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.get('/kupa', function(req, res) {
	res.send('Hello World! z kupą!');
});

app.post('/hello', (req, res) => {
	res.send('co bys tam wrzucil:' + req.headers.input);
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
