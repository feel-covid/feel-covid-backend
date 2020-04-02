import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigService {
	public typeOrmConfig: TypeOrmModuleOptions = {
		type: process.env.DATABASE_TYPE as any,
		host: process.env.DATABASE_HOST,
		port: Number(process.env.DATABASE_PORT),
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		entities: [__dirname + '/../**/*.entity.{js,ts}'],
		synchronize: true
	};

	public scraperConfig = {
		dataSourceURL: 'https://www.worldometers.info/coronavirus/country/israel/'
	};
}
