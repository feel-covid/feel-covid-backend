import * as winston from 'winston';

export const prettyLoggerJSON = winston.format.printf(info => {
	if (info.message.constructor === Object) {
		info.message = JSON.stringify(info.message, null, 2);
	}
	return `${info.level}: ${info.message}`;
});
