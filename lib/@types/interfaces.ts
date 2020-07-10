export interface ICondition {
	cases: number;
	intubated?: number;
}

export interface ITreatment {
	hospital: number;
	home: number;
	hotel: number;
	undecided: number;
}

export interface IStat {
	light: ICondition;
	mid: ICondition;
	severe: ICondition;
	deceased: number;
	recovered: number;
	date: number;
	treatment: ITreatment;
}

export interface ICountry {
	id?: string;
	name: string;
}

export interface ITestAmount {
	countryId?: string;
	date: string;
	amount: number;
	positive: number;
}

export interface IDailyStat {
	infected: number;
	recovered: number;
	deceased: number;
	countryId?: string;
	date: string;
}
