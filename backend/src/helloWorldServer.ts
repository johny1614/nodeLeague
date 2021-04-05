import express from 'express';
import { MongoClient } from 'mongodb';


const app = express();
app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.get('/kupa', function(req, res) {
	res.send('Hello World! z kupą!');
});

app.post('/hello', (req, res) => {
	const connectionUri = 'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb';
	MongoClient.connect(connectionUri).then((mongoClient: MongoClient) => {
		mongoClient.db('helloDB').collection('helloCOL').insertOne({ value: req.headers.input }).then(x => {
			console.log('jest response', x);
		});
	});
	res.setHeader('Access-Control-Allow-Origin', 'localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.send('done' + req.headers.input);
});
app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
