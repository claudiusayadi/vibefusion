import { cors } from 'hono/cors';
import { env } from '@/utils/types';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import recommender from './routes/recommend';

const app = new Hono();
app.use(
	'*',
	cors({
		origin: ['*'],
		allowMethods: ['POST', 'GET', 'OPTIONS'],
		allowHeaders: ['Content-Type'],
	})
);
app.use('*', logger());

const routes = app.basePath('/api/v1').route('/recommend', recommender);

export type AppType = typeof routes;

export default {
	port: env.PORT,
	fetch: app.fetch,
};
