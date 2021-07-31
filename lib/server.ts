require('dotenv').config();
import { setupRouter } from './api/setupRouter';
import { setupMiddlewares } from './middlewares';
import express from 'express';
import { logger } from './services/loggingService';
import { TypeormConnector } from './connectors/typeormConnector';
import { SentryConnector } from './connectors/sentryConnector';
import { RedisConnector } from './connectors/redisConnector';
import connections from './connections';
import * as Sentry from '@sentry/node';
import type { Connection } from 'typeorm';

const main = async () => {
	const redis = await new RedisConnector().connect();
	const database = await new TypeormConnector().connect();
	connections.setRedis(redis).setDatabase(database);

	const app: express.Application = express();
	setupMiddlewares(app);
	setupRouter(app);

	const PORT = process.env.NODE_PORT || 5000;
	app.listen(PORT, () => {
		logger.info(`Server started successfully on port ${PORT}`);
	});

	attachExitListeners(database);
};

const attachExitListeners = (database: Connection) => {
	const close = async (exitCode = 0) => {
		try {
			await database.close();
			logger.info('Successfully closed database connection');
		} catch (ex) {
			logger.error('Failed to close database connection', { ex });
			exitCode = 1;
		} finally {
			process.exit(exitCode);
		}
	};

	if (process.env.NODE_ENV !== 'development') {
		new SentryConnector().connect();
		process
			.on('unhandledRejection', reason => Sentry.captureException(reason))
			.on('uncaughtException', async ex => {
				try {
					Sentry.captureException(ex);
				} catch {}
				await close(1);
			});
	}
	process.on('SIGTERM', () => close());
	process.on('SIGINT', () => close());
};

main();
