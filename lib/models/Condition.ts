import { Column, PrimaryGeneratedColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Condition {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	cases: number;

	@Column({ nullable: true })
	intubated: number;
}
