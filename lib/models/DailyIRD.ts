import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	Unique
} from 'typeorm';
import { Country } from './Country';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@Unique(['date'])
export class DailyIRD extends BaseEntity {
	@PrimaryColumn('uuid')
	id: string;

	@PrimaryColumn()
	countryId: string;

	@ManyToOne(
		type => Country,
		country => country.dailyIRD
	)
	@JoinColumn({ name: 'countryId' })
	country: Country;

	@Column('date')
	date: string;

	@Column('integer')
	infected: number;

	@Column('integer')
	recovered: number;

	@Column('integer')
	deceased: number;

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
