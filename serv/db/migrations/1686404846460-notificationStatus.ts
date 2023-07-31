import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationStatus1686404846460 implements MigrationInterface {
    name = 'NotificationStatus1686404846460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`complaintMessage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`status\` enum ('waiting', 'rejected', 'approved', 'complaint') NOT NULL DEFAULT 'waiting'`);
 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`status\` varchar(255) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`complaintMessage\``);
    }

}
