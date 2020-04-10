import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as cron from 'node-cron';
import { scraperConfig } from '../config/scraper.config';

const init = async () => {
	// cron.schedule(scraperConfig.cronSchedule, handleCron);
	// await handleCron();
};

const handleCron = async () => {
	const pageContents = await getPageContents();
	const relevantProperties = extractRelevantProperties(pageContents);
};

const getPageContents = async (): Promise<string> => {
	return fetch(scraperConfig.dataSourceUrl).then(res => res.text());
};

const extractRelevantProperties = async (pageContents: string) => {
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
};

export default {
	init
};
