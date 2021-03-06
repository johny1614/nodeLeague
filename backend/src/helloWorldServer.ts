import express from 'express';
import { MatchRoutes } from './routes/MatchRoutes';
import { Routes } from './routes/Routes';
import { ImageRoutes } from './routes/ImageRoutes';
import { ChampionRoutes } from './routes/ChampionRoutes';
import { SummonerRoutes } from './Summoner/SummonerRoutes';

const app = express();

const routes: Array<Routes> = [
	new MatchRoutes(),
	new ImageRoutes(),
	new SummonerRoutes(),
	new ChampionRoutes()
];
routes.forEach((domainRoutes: Routes) => domainRoutes.route(app));

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
