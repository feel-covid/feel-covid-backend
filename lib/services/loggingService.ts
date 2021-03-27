import * as bunyan from 'bunyan';
import { bunyanConfig } from '../config/bunyan.config';

const _logger = bunyan.createLogger(bunyanConfig);
export const logger = new Proxy(_logger, {
	get(target: typeof _logger, prop: PropertyKey): any {
		return (message, breadcrumbs) => {
			const args = [message];
			if (breadcrumbs) args.unshift(breadcrumbs);

			target[prop](...args);
		};
	}
});
