import * as bunyanDebugStream from 'bunyan-debug-stream';
import * as bunyan from 'bunyan';
import * as Sentry from '@sentry/node';

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

export const bunyanConfig = configEnvMapper[process.env.NODE_ENV];
