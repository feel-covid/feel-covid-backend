import { Controller, Get } from '@nestjs/common';
import { ScraperService } from '../scraper/scraper.service';

@Controller('stats')
export class StatsController {
	constructor(private scraperService: ScraperService) {}
	@Get('/')
	handleGet() {
		return this.scraperService.handleCron();
	}
}
