import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		LoggerModule.forRoot({
			pinoHttp: {
				prettyPrint: process.env.NODE_ENV !== 'production'
			}
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql'
		}),
		TypeOrmModule.forRoot(typeOrmConfig),

		UsersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
