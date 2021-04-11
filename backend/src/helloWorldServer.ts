import express from 'express';
import axios from 'axios';

import { MongoClient } from 'mongodb';
import { tokens } from './tokens';

const mongoConnectionUri = 'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb';

const app = express();
app.get('/helloworld', function(req, res) {
	res.send({ text: 'Hello World!' });
});

app.get('/match/:matchid', (req, res) => {
	const connectionUri = `https://eun1.api.riotgames.com/lol/match/v4/matches/${req.params.matchid}`;
	console.log('id:', req.params.matchid);
	const options = { headers: { 'X-Riot-Token': tokens[0] } };
	MongoClient.connect(mongoConnectionUri).then((mongoClient: MongoClient) => {
		mongoClient.db('Riot').collection('Matches').findOne({ 'value.gameId': parseInt(req.params.matchid) }).then(response => {
			res.send(response.value);
			console.log('dajemy resopnse bo jest w bazce');
			return;
		}).catch(x => {
			console.log(`nie ma w bazce ${req.params.matchid}`);
			axios.get(connectionUri, options).then(response => {
				MongoClient.connect(mongoConnectionUri).then((mongoClient: MongoClient) => {
					mongoClient.db('Riot').collection('Matches').insertOne({ value: response.data }).then(x => {
					});
				});
				console.log('dajemy resopnse');
				res.send(response.data);
			}).catch(err => {
				console.log('czyzby zly matchId? Riot odpowiedzial z errorem', err.status);
			});
		});
	});
});

app.get('/summoners/by-name/:summonername', (req, res) => {
	const summonerName = req.params.summonername;
	const region = req.header('region');
	const connectionUri = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
	const options = { headers: { 'X-Riot-Token': tokens[0] } };

	MongoClient.connect(mongoConnectionUri).then((mongoClient: MongoClient) => {
		console.log('findOne', { 'value.name': summonerName });
		const filter = { 'value.name': { $regex: new RegExp(summonerName, 'i') } };
		mongoClient.db('Riot').collection(`Summoners${region}`).findOne(filter).then(response => {
			res.send(response.value);
			console.log('dajemy resopnse bo jest w bazce');
			return;
		}).catch(x => {
			console.log(`nie ma w bazce summonerName`);
			axios.get(connectionUri, options).then(response => {
				MongoClient.connect(mongoConnectionUri).then((mongoClient: MongoClient) => {
					mongoClient.db('Riot').collection(`Summoners${region}`).insertOne({ value: response.data }).then(x => {
						console.log('dodane do bazki');
						res.send(response.data);
					});
				});
			}).catch(x => {
				console.log('Rito zwrocilo blad', x);
			});
		});
	});
});


app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
