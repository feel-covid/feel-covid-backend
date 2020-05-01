import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as cron from 'node-cron';
import { scraperConfig } from '../config/scraper.config';
import * as csvParser from 'csvtojson';

export interface ICSVItem {
	Date: string;
	'Total Cases': string;
	'New Cases': string;
	'בינוני Moderate': string;
	'קשה Severe': string;
	'נפטרו Deceased': string;
	'Total Recovered': string;
	'New Recovered': string;
	'נבדקים היום Tested Today': string;
	'סה"כ נבדקים Total Tested': string;
	'אחוז חיוביים Percent Positive': string;
	'GF Normalized to Tests': string;
	Baseline: string;
}

const init = async () => {
	// cron.schedule(scraperConfig.cronSchedule, handleCron);
	await handleCron();
};

const handleCron = async () => {
	const pageContents = await getPageContents();
	const relevantProperties = await extractRelevantProperties(pageContents);
};

const getPageContents = async (): Promise<string> => {
	return fetch(scraperConfig.dataSourceUrl).then(res => res.text());
};

const extractRelevantProperties = async (csvString: string) => {
	const parsedCsv = (await csvParser().fromString(csvString)) as Array<ICSVItem>;
	return parsedCsv.map(item => {
		const [day, month, year] = item.Date.split('/');
		return {
			date: new Date(`${month}/${day}/${year}`),
			amount: Number(item['סה"כ נבדקים Total Tested'])
		};
	});
};

export default {
	init
};
