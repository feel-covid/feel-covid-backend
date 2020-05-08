import { startOfDay, endOfDay } from 'date-fns';

interface IParams {
	suffix: string;
	firstDate: string;
	secondDate: string;
}

export const createCacheKeyFromDate = ({
	suffix,
	firstDate,
	secondDate
}: IParams): string => {
	const _startOfDay = startOfDay(new Date(JSON.parse(firstDate))).toISOString();
	const _endOfDay = endOfDay(new Date(JSON.parse(secondDate))).toISOString();

	return `${suffix}-${_startOfDay}-${_endOfDay}`;
};
