import 'pino-http';
import { LoggerModuleAsyncParams, Params } from 'nestjs-pino/dist/params';
import { DynamicModule } from '@nestjs/common';

declare module 'pino-http' {
	interface Options {
		prettyPrint?: boolean;
	}

	/*
	 * It seems nestjs-pino and graphql have a type conflict in module.forRoot.
	 * In order to avoid errors we need to declare the LoggerModule here.
	 * */
	class LoggerModule {
		static forRoot(params?: Params | undefined): DynamicModule;
		static forRootAsync(params: LoggerModuleAsyncParams): DynamicModule;
	}
}
