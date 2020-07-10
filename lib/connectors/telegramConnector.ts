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

			const res = await fetch(URL);
			console.log(await res.json());
		} catch (ex) {
			console.log(ex);
			logger.error(ex.message);
		}
	}
}

export default new TelegramConnector();
