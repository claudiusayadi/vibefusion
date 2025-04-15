import { cors } from 'hono/cors';
import { env } from '@/utils/types';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import recommender from './routes/recommend';
import healthChecker from './routes/health';

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

const routes = app
	.basePath('/api/v1')
	.route('/health', healthChecker)
	.route('/recommend', recommender);

export type AppType = typeof routes;

export const server = Bun.serve({
	port: env.API_PORT,
	fetch: app.fetch,
});

console.log(`Server up and running on port ${env.API_PORT}`);
