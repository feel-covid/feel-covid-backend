import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StatsController } from '../stats/stats.controller';
import { ScraperService } from '../scraper/scraper.service';
import { ConfigService } from '../config/config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		LoggerModule.forRoot({
			pinoHttp: {
				prettyPrint: process.env.NODE_ENV !== 'production'
			}
		})
		// GraphQLModule.forRoot({
		// 	autoSchemaFile: 'schema.gql'
		// })
		// TypeOrmModule.forRoot(typeOrmConfig)
	],
	controllers: [AppController, StatsController],
	providers: [AppService, ScraperService, ConfigService]
})
export class AppModule {}
