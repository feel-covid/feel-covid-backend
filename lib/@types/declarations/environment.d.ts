export {};

declare global {
	namespace NodeJS {}
	interface ProcessEnv {
		DATABASE_HOST: string;
		DATABASE_USER: string;
		DATABASE_PASSWORD: string;
		DATABASE_TYPE: string;
		DATABASE_PORT: string;
		DATABASE_NAME: string;
		PORT: string;
		NODE_ENV: string;
	}
}
