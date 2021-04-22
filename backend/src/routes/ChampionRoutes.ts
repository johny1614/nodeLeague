import { Routes } from './Routes';
import { Application } from 'express';
import { ChampionData, getChampionByKey, getChampionByName } from './../staticData/champions';

export class ChampionRoutes extends Routes {
	route(app: Application): void {
		app.get('/champions/by-name/:championname', (req, res) => {
			const championName = req.params.championname;
			const champion: ChampionData = getChampionByName(championName);
			res.send(champion);
		});

		app.get('/champions/by-key/:championkey', (req, res) => {
			const championKey = req.params.championkey;
			const champion: ChampionData = getChampionByKey(championKey);
			res.send(champion);
		});
	}
}
