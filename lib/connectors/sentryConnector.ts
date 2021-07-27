import Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';

if (process.env.NODE_ENV !== 'development') {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		integrations: [
			new RewriteFrames({
				// @ts-ignore
				root: global.__rootdir__
			})
		]
	});

	process
		.on('unhandledRejection', reason => Sentry.captureException(reason))
		.on('uncaughtException', ex => {
			Sentry.captureException(ex);
			process.exit(1);
		});
}
