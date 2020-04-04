import { Column, PrimaryGeneratedColumn, Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Country } from './Country';
import { Treatment } from './Treatment';
import { Condition } from './Condition';

@Entity()
export class Stat {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(type => Condition)
	@JoinColumn()
	lightCondition: Condition;

	@OneToOne(type => Condition)
	@JoinColumn()
	midCondition: Condition;

	@OneToOne(type => Condition)
	@JoinColumn()
	severeCondition: Condition;

	@Column()
	deceased: number;

	@Column()
	recovered: number;

	@Column('date')
	date: Date;

	@PrimaryColumn()
	countryId: number;
	@ManyToOne(
		type => Country,
		country => country.stats
	)
	@JoinColumn({ name: 'countryId' })
	country: Country;

	@OneToOne(type => Treatment)
	@JoinColumn()
	treatment: Treatment;
}
