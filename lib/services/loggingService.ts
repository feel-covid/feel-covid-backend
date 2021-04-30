import bunyan from 'bunyan';
import bunyanDebugStream from 'bunyan-debug-stream';
import Sentry from '@sentry/node';

const configEnvMapper = {
	development: {
		name: 'feel-covid-development',
		streams: [
			{
				level: 'trace',
				type: 'raw',
				stream: bunyanDebugStream({
					basepath: __dirname,
					forceColor: true,
					stringifiers: {
						ex: bunyanDebugStream.stdStringifiers.err
					}
				})
			}
		]
	},
	production: {
		name: 'feel-covid-production',
		streams: [
			{
				level: 'info',
				type: 'raw',
				stream: {
					write: record => {
						const { msg, level, ...rest } = record;

						if (rest.req) {
							rest.req = bunyan.stdSerializers.req(rest.req);
						}

						Sentry.captureEvent({
							level: Sentry.Severity.fromString(bunyan.nameFromLevel[level]),
							message: msg,
							breadcrumbs: [
								{
									data: rest
								}
							]
						});
					}
				},
				serializers: {
					...bunyan.stdSerializers,
					ex: bunyan.stdSerializers.err
				}
			}
		]
	}
};

const _logger = bunyan.createLogger(configEnvMapper[process.env.NODE_ENV]);

export const logger = new Proxy(_logger, {
	get(target: typeof _logger, prop: PropertyKey): any {
		return (message, breadcrumbs) => {
			const args = [message];
			if (breadcrumbs) args.unshift(breadcrumbs);

			target[prop](...args);
		};
	}
});
