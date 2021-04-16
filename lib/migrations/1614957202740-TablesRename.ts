import { MigrationInterface, QueryRunner } from 'typeorm';

export class TablesRename1614957202740 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`ALTER TABLE test_amount RENAME TO daily_test_amount`);
		await queryRunner.query(`ALTER TABLE stat RENAME TO hourly_update`);
		await queryRunner.query(`ALTER TABLE daily_stats RENAME TO daily_ird`);
	}

	// tslint:disable-next-line:no-empty
	public async down(queryRunner: QueryRunner): Promise<any> {}
}
