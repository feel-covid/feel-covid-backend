import { startOfDay, endOfDay } from 'date-fns';

interface IParams {
	prefix: string;
	firstDate: string;
	secondDate: string;
}

export const createCacheKeyFromDate = ({
	prefix,
	firstDate,
	secondDate
}: IParams): string => {
	const _startOfDay = startOfDay(new Date(JSON.parse(firstDate))).toISOString();
	const _endOfDay = endOfDay(new Date(JSON.parse(secondDate))).toISOString();

	return `${prefix}-${_startOfDay}-${_endOfDay}`;
};
