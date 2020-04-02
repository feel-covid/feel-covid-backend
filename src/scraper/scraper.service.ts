import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Logger } from 'nestjs-pino';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ScraperService {
	constructor(private readonly logger: Logger, private readonly config: ConfigService) {}

	@Cron(CronExpression.EVERY_30_MINUTES)
	async handleCron() {
		const pageContents = await this.getPageContents();
		const relevantProperties = this.extractRelevantProperties(pageContents);
	}

	async getPageContents(): Promise<string> {
		return fetch(this.config.scraperConfig.dataSourceURL).then(res => res.text());
	}

	extractRelevantProperties(pageContents: string) {
		const $ = cheerio.load(pageContents);

		const propertiesMapper = {
			0: 'activeCases',
			1: 'deaths',
			2: 'recovered'
		};

		const properties = $('.maincounter-number')
			.get()
			.reduce((acc, currentElement, index) => {
				acc[propertiesMapper[index]] = $(currentElement)
					.find('span' as any)
					.text()
					.trim();

				return acc;
			}, {});

		return properties;
	}
}
