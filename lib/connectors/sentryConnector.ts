import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { Connector } from './Connector';

export class SentryConnector implements Connector {
	connect() {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			integrations: [
				new RewriteFrames({
					root: global.__rootdir__
				})
			]
		});

		return Sentry;
	}

	close() {}
}
