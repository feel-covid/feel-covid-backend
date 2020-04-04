import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, BaseEntity, Unique, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Country } from './Country';
import { ICondition, ITreatment } from '../@types/interfaces';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@Unique(['date'])
export class Stat extends BaseEntity {
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

	@Column('jsonb')
	light: ICondition;

	@Column('jsonb')
	mid: ICondition;

	@Column('jsonb')
	severe: ICondition;

	@Column()
	deceased: number;

	@Column('jsonb')
	treatment: ITreatment;

	@Column()
	recovered: number;

	@Column('timestamptz')
	date: Date;

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
