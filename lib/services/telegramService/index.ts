import bus, { EventBus } from '../../bus';
import { Stat } from '../../models/Stat';
import telegramConnector from '../../connectors/telegramConnector';
import { generateTemplate } from './utils';

const init = () => {
	bus.on(EventBus.EVENTS.STAT_ADDED, handleStatAdded);
};

const handleStatAdded = async (payload: Stat) => {
	await telegramConnector.sendMessage(generateTemplate(payload));
};

export default { init };
