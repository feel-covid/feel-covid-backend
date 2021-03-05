export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_HOST: string;
			DATABASE_USER: string;
			DATABASE_PASSWORD: string;
			DATABASE_TYPE: 'postgres';
			DATABASE_PORT: string;
			DATABASE_NAME: string;
			NODE_PORT: string;
			NODE_ENV: string;
			API_KEY: string;
			REDIS_PORT: string;
			REDIS_HOST: string;
			SENTRY_DSN: string;
			TELEGRAM_BOT_TOKEN: string;
			TELEGRAM_CHANNEL_ID: string;
		}

		interface Global {
			__rootdir__: string;
		}
	}
}
