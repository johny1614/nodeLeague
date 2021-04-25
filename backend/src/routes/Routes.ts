import { Application } from 'express';
import { tokens } from '../tokens';

export abstract class Routes {

	mongoConnectionUri = 'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb';
	options = { headers: { 'X-Riot-Token': tokens[0] } };


	abstract route(app: Application): void;
}
