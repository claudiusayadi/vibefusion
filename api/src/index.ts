import { cors } from 'hono/cors';
import { env } from '@/utils/types';
import { Hono } from 'hono';
import recommender from './routes/recommend';

const app = new Hono();
app.use('*', cors());

const routes = app.basePath('/api/v1').route('/recommend', recommender);

export type AppType = typeof routes;

export default {
	port: env.PORT,
	fetch: app.fetch,
};
