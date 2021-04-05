import express from 'express';
import axios from 'axios';

import { MongoClient } from 'mongodb';
import { tokens } from './tokens';

const mongoConnectionUri = 'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb';

const app = express();
app.get('/helloworld', function(req, res) {
	res.send({ text: 'Hello World!' });
});

app.post('/hello', (req, res) => {
	MongoClient.connect(mongoConnectionUri).then((mongoClient: MongoClient) => {
		mongoClient.db('helloDB').collection('helloCOL').insertOne({ value: req.headers.input }).then(x => {
			console.log('jest response', x);
		});
	});
	res.setHeader('Access-Control-Allow-Origin', 'localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.send({ text: 'done' + req.headers.input });
});

app.get('/match/:matchid', (req, res) => {
	const connectionUri = `https://eun1.api.riotgames.com/lol/match/v4/matches/${req.params.matchid}`;
	const options = { headers: { 'X-Riot-Token': tokens[0] } };
	axios.get(connectionUri, options).then(x => {
		console.log('jest i res!', x);
		res.send({ match: x.data });
	});
});


app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
