import {
	Column,
	PrimaryColumn,
	Entity,
	OneToMany,
	BaseEntity,
	BeforeInsert
} from 'typeorm';
import { Stat } from './Stat';
import { v4 as uuidv4 } from 'uuid';
import { TestAmount } from './TestAmount';
import { DailyStats } from './DailyStats';

@Entity()
export class Country extends BaseEntity {
	@PrimaryColumn('uuid')
	id: string;

	@Column()
	name: string;

	@OneToMany(
		type => Stat,
		stat => stat.country
	)
	stats: Stat[];

	@OneToMany(
		type => TestAmount,
		testAmount => testAmount.country
	)
	tests: TestAmount[];

	@OneToMany(
		type => DailyStats,
		dailyStats => dailyStats.country
	)
	dailyStats: DailyStats[];

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}
