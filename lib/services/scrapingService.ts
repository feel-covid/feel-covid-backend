import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { scraperConfig } from '../config/scraper.config';

export class ScraperService {
	async handleCron() {
		const pageContents = await this.getPageContents();
		const relevantProperties = this.extractRelevantProperties(pageContents);
	}

	async getPageContents(): Promise<string> {
		return fetch(scraperConfig.dataSourceURL).then(res => res.text());
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
