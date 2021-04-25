import { Application, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import { tokens } from '../tokens';
import { Routes } from '../routes/Routes';

export class SummonerRoutes extends Routes {

	public route(app: Application): void {
		app.get('/summoners/by-name/:summonername', (req, res) => {
			const summonerName = req.params.summonername;
			const region = req.header('region');
			const connectionUri = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
			const options = { headers: { 'X-Riot-Token': tokens[0] } };

			MongoClient.connect(this.mongoConnectionUri).then((mongoClient: MongoClient) => {
				console.log('findOne', { 'value.name': summonerName });
				const filter = { 'value.name': { $regex: new RegExp(summonerName, 'i') } };
				mongoClient.db('Riot').collection(`Summoners${region}`).findOne(filter).then(response => {
					res.send(response.value);
					console.log('dajemy resopnse bo jest w bazce');
					return;
				}).catch(x => {
					console.log(`nie ma w bazce summonerName`);
					axios.get(connectionUri, options).then(response => {
						MongoClient.connect(this.mongoConnectionUri).then((mongoClient: MongoClient) => {
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

	}
}
