import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Stat } from './Stat';

@Entity()
export class Country {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(
		type => Stat,
		stat => stat.country
	)
	stats: Stat[];
}
