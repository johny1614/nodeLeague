import { Routes } from './Routes';
import { Application } from 'express';
import { tokens } from '../tokens';
import { MongoClient } from 'mongodb';
import axios from 'axios';
import * as fs from 'fs';

export class ImageRoutes extends Routes {
	route(app: Application): void {
		app.get('/champions/icon/:championname', (req, res) => {
			const championName = req.params.championname;
			const filePath = `src/staticData/images/champion/icons/${championName}.png`;
			fs.readFile(filePath, function(err, data) {
				if (!err) {
					res.writeHead(200, { 'Content-Type': 'image/jpg' });
					res.end(data);
				} else {
					console.log(`Cannot read icon file for ${championName} so we hit Riot Api`, err);
					const url = `http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/${championName}.png`;
					const options = {
						headers: { 'X-Riot-Token': tokens[0] },
						responseType: 'arraybuffer'
					};
					// @ts-ignore
					axios.get(url, options).then(response => {
						res.writeHead(200, { 'Content-Type': 'image/jpg' });
						res.end(response.data);
						const base64Img = Buffer.from(response.data, 'binary').toString('base64');
						fs.writeFile(filePath, base64Img, 'base64', (err) => {
							if (err) {
								console.log(`Cannot save icon file for ${championName}`, err);
							} else {
								console.log(`Saving icon file for ${championName} successfull`);
							}
						});
					}).catch(x => {
						console.log('Rito zwrocilo blad', x);
					});

				}
			});

		});


	}

}
