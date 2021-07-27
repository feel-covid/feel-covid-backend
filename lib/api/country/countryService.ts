import { ICountry } from '../../@types/interfaces';
import { CountryRepository } from '../../repositories/CountryRepository';

const handleGetCountryHourlyUpdates = async payload => {
	const { name, startDate, endDate } = payload;
	const data = await CountryRepository.getHourlyUpdates(name, startDate, endDate);
	return data;
};

const handleGetCountryTests = async payload => {
	const { name, startDate, endDate } = payload;
	const data = await CountryRepository.getDailyTestAmount(name, startDate, endDate);
	return data;
};

const handleGetCountryDailyIRD = async payload => {
	const { name, startDate, endDate } = payload;
	const data = await CountryRepository.getDailyIRD(name, startDate, endDate);
	return data;
};

const handleGetCountryDailyVaccinations = async payload => {
	const { name, startDate, endDate } = payload;
	const data = await CountryRepository.getDailyVaccination(name, startDate, endDate);
	return data;
};

const handleAddCountry = async (payload: ICountry) => {
	await CountryRepository.createCountry(payload.name);
};

export default {
	handleGetCountryHourlyUpdates,
	handleGetCountryDailyIRD,
	handleGetCountryTests,
	handleGetCountryDailyVaccinations,
	handleAddCountry
};
