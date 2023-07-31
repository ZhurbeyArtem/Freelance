import { MigrationInterface, QueryRunner } from "typeorm";

export class Marks1686412519375 implements MigrationInterface {
    name = 'Marks1686412519375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`marks\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`marks\` text NOT NULL`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`marks\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`marks\` int NOT NULL DEFAULT '0'`);
    }

}
