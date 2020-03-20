import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(process.env.PORT, () => {
		// tslint:disable-next-line:no-console
		console.log(`Server started successfully on port ${process.env.PORT}`);
	});
}

bootstrap();
