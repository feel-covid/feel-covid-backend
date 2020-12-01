import * as winston from 'winston';
import * as Sentry from 'winston-sentry-log';
const { format, transports } = winston;

const winstonEnvConfigMapper = {
	development: {
		format: format.combine(
			format.colorize(),
			format.prettyPrint(),
			format.splat(),
			format.simple(),
			winston.format.printf(info => {
				if (info.message.constructor === Object) {
					info.message = JSON.stringify(info.message, null, 2);
				}
				return `${info.level}: ${info.message}`;
			})
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
