import bus, { EventBus } from '../../bus';
import { HourlyUpdate } from '../../models/HourlyUpdate';
import telegramConnector from '../../connectors/telegramConnector';
import { generateTemplate } from './utils';

const init = () => {
	bus.on(EventBus.EVENTS.STAT_ADDED, handleStatAdded);
};

const handleStatAdded = async (payload: HourlyUpdate) => {
	await telegramConnector.sendMessage(generateTemplate(payload));
};

export default { init };
