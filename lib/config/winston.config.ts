import * as winston from 'winston';
import * as Sentry from 'winston-sentry-log';
import { prettyLoggerJSON } from '../utils/prettyLoggerJSON';
const { format, transports } = winston;

const winstonEnvConfigMapper = {
	development: {
		format: format.combine(
			format.colorize(),
			format.prettyPrint(),
			format.splat(),
			format.simple(),
			prettyLoggerJSON
		),
		transports: [new transports.Console({})]
	},
	production: {
		format: format.combine(format.splat()),
		transports: [
			// @ts-expect-error
			new Sentry({
				config: {
					dsn: process.env.SENTRY_DSN
				}
			})
		]
	}
};

export const winstonConfig = {
	level: 'info',
	...winstonEnvConfigMapper[process.env.NODE_ENV]
};
