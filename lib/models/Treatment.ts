import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Treatment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	hospital: number;

	@Column()
	hotel: number;

	@Column()
	home: number;

	@Column()
	notDecided: number;
}
