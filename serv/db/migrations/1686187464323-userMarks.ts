import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMarks1686187464323 implements MigrationInterface {
    name = 'UserMarks1686187464323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`badMark\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`goodMark\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`isApproved\` \`isApproved\` varchar(255) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`price\` \`price\` varchar(255) NOT NULL`);
    }

}
