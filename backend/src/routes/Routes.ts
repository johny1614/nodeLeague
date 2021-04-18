import { Application } from 'express';

export interface Routes {
	route(app: Application): void;
}
