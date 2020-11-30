import {
	Column,
	PrimaryColumn,
	Entity,
	OneToMany,
	BaseEntity,
	BeforeInsert
} from 'typeorm';
import { HourlyUpdate } from './HourlyUpdate';
import { v4 as uuidv4 } from 'uuid';
import { DailyTestAmount } from './DailyTestAmount';
import { DailyIRD } from './DailyIRD';

@Entity()
export class Country extends BaseEntity {
	@PrimaryColumn('uuid')
	id: string;

	@Column()
	name: string;

	@OneToMany(
		type => HourlyUpdate,
		hourlyUpdate => hourlyUpdate.country
	)
	hourlyUpdate: HourlyUpdate[];

	@OneToMany(
		type => DailyTestAmount,
		dailyTestAmount => dailyTestAmount.country
	)
	dailyTestAmount: DailyTestAmount[];

	@OneToMany(
		type => DailyIRD,
		dailyIRD => dailyIRD.country
	)
	dailyIRD: DailyIRD[];

	@BeforeInsert()
	addId() {
		this.id = uuidv4();
	}
}