import { Application } from 'express';

export abstract class Routes {

	mongoConnectionUri = 'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb';

	abstract route(app: Application): void;
}
