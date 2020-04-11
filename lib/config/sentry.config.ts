import { RewriteFrames } from '@sentry/integrations';

export const sentryConfig = {
	dsn: process.env.SENTRY_DSN,
	integrations: [
		new RewriteFrames({
			root: global.__rootdir__
		})
	]
};
