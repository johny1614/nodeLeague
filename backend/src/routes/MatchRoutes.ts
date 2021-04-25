import { Application, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import { Routes } from './Routes';
import { SummonerDTO } from './../Summoner/SummonerDTO';


export class MatchRoutes extends Routes {

	public route(app: Application) {

		app.get('/helloworld', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Get hellow world successfull' });
		});
		app.post('/api/test', (req: Request, res: Response) => {
			res.status(200).json({ message: 'Post request successfull' });
		});

		app.get('/matches/by-summoner-name/:summonername', (req, res) => {
			this.fetchSummonerMatchReferences(req).then((response: { data: SummonerDTO }) => {
				const accountId = response.data.accountId;
				const getMatchesUri = `https://${req.header('server')}.api.riotgames.com//lol/match/v4/matchlists/by-account/${accountId}`;
				axios.get(getMatchesUri, this.options).then(response => {
					res.send(response.data);
					this.insertMatchReferences(response.data.matches);
				});
			});
		});


		app.get('/match/:matchid', (req, res) => {
			const connectionUri = `https://eun1.api.riotgames.com/lol/match/v4/matches/${req.params.matchid}`;
			console.log('id:', req.params.matchid);
			MongoClient.connect(this.mongoConnectionUri).then((mongoClient: MongoClient) => {
				mongoClient.db('Riot').collection('Matches').findOne({ 'value.gameId': parseInt(req.params.matchid) }).then(response => {
					res.send(response.value);
					console.log('dajemy resopnse bo jest w bazce');
					return;
				}).catch(x => {
					console.log(`nie ma w bazce ${req.params.matchid}`);
					axios.get(connectionUri, this.options).then(response => {
						MongoClient.connect(this.mongoConnectionUri).then((mongoClient: MongoClient) => {
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

	private fetchSummonerMatchReferences(req: any): Promise<{ data: SummonerDTO }> {
		const summonerName = req.params.summonername;
		const server = req.header('server');
		const connectionUri = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
		return axios.get(connectionUri, this.options);
	}

	private insertMatchReferences(matches) {
		MongoClient.connect(this.mongoConnectionUri).then((mongoClient: MongoClient) => {
			mongoClient.db('Riot').collection('MatchReferences')
					   .insertMany(matches, { ordered: false }).then(x => {
				console.log('udalo sie wrzucic gre');
			}).catch(er => {
				console.log('nie udalo sie wrzucic gry');
			});
		});
	}
}


