import { Application, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import { tokens } from '../tokens';
import { Routes } from './Routes';

export class MatchRoutes extends Routes {

	public route(app: Application) {
		const mongoConnectionUri = 'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb';

		app.get('/helloworld', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Get hellow world successfull' });
		});
		app.post('/api/test', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Post request successfull' });
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
	}
}
