import fetch from 'node-fetch';
import { logger } from '../services/loggingService';

class TelegramConnector {
	async sendMessage(message: string) {
		try {
			const URL = `https://api.telegram.org/bot${
				process.env.TELEGRAM_BOT_TOKEN
			}/sendMessage?chat_id=${
				process.env.TELEGRAM_CHANNEL_ID
			}&parse_mode=Markdown&disable_web_page_preview=true&text=${encodeURIComponent(
				message
			)}`;

			await fetch(URL);
		} catch (ex) {
			logger.error(ex.message);
		}
	}
}

export default new TelegramConnector();
