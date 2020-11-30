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
export class DailyTestAmount extends BaseEntity {
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
	amount: number;

	@Column('double precision')
	positive: number;

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
