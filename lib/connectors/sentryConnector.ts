import * as Sentry from '@sentry/node';
import { sentryConfig } from '../config/sentry.config';

if (process.env.NODE_ENV !== 'development') {
	Sentry.init(sentryConfig);

	process
		.on('unhandledRejection', reason => Sentry.captureException(reason))
		.on('uncaughtException', ex => {
			Sentry.captureException(ex);
			process.exit(1);
		});
}
