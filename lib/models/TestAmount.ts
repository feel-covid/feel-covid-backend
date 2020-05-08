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
export class TestAmount extends BaseEntity {
	@PrimaryColumn('uuid')
	id: string;

	@PrimaryColumn()
	countryId: string;

	@ManyToOne(
		type => Country,
		country => country.stats
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
