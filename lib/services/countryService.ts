import { ICountry } from '../@types/interfaces';
import { Country } from '../models/Country';

const handleAddCountry = async (payload: ICountry) => {
	try {
		const newCountry = Country.create({
			name: payload.name
		});

		await newCountry.save();
	} catch (ex) {
		throw new Error(ex);
	}
};

export default {
	handleAddCountry
};
