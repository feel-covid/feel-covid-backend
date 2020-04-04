import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToOne, BaseEntity, Unique } from 'typeorm';
import { Country } from './Country';
import { ICondition, ITreatment } from '../@types/interfaces';

@Entity()
@Unique(['date'])
export class Stat extends BaseEntity {
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

	@Column('date')
	date: Date;
}
