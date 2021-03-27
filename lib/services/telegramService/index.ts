import { HourlyUpdate } from '../../models/HourlyUpdate';
import telegramConnector from '../../connectors/telegramConnector';
import { generateTemplate } from './utils';

// tslint:disable-next-line:no-empty
const init = () => {};

const handleStatAdded = async (payload: HourlyUpdate) => {
	await telegramConnector.sendMessage(generateTemplate(payload));
};

export default { init };
