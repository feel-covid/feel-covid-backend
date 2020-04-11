export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_HOST: string;
			DATABASE_USER: string;
			DATABASE_PASSWORD: string;
			DATABASE_TYPE: string;
			DATABASE_PORT: string;
			DATABASE_NAME: string;
			PORT: string;
			NODE_ENV: string;
			API_KEY: string;
			REDIS_PORT: string;
			SENTRY_DSN: string;
		}

		interface Global {
			__rootdir__: string;
		}
	}
}
