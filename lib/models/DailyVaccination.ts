import {
	Entity,
	PrimaryColumn,
	BaseEntity,
	Column,
	BeforeInsert,
	ManyToOne,
	JoinColumn,
	Unique
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Country } from './Country';

@Entity()
@Unique(['date'])
export class DailyVaccination extends BaseEntity {
	@PrimaryColumn('uuid')
	id: string;

	@PrimaryColumn()
	countryId: string;

	@ManyToOne(
		type => Country,
		country => country.dailyTestAmount
	)
	@JoinColumn({ name: 'countryId' })
	country: Country;

	@Column('date')
	date: string;

	@Column('integer')
	first_dose_amount: number;

	@Column('double precision')
	first_dose_percentage: number;

	@Column('integer')
	first_dose_cumulative: number;

	@Column('integer')
	second_dose_amount: number;

	@Column('double precision')
	second_dose_percentage: number;

	@Column('integer')
	second_dose_cumulative: number;

	@Column('integer', { default: 0 })
	third_dose_amount: number;

	@Column('double precision', { default: 0 })
	third_dose_percentage: number;

	@Column('integer', { default: 0 })
	third_dose_cumulative: number;

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}

export type IDailyVaccination = Omit<
	DailyVaccination,
	keyof BaseEntity | 'addId' | 'country'
>;
