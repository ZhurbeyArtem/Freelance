import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationFix1686435654348 implements MigrationInterface {
    name = 'NotificationFix1686435654348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tags\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`complaintMessage\` \`complaintMessage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`message\` \`message\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`title\` \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`hourlyRate\` \`hourlyRate\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`duration\` \`duration\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`file\` \`file\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`fileFreelancer\` \`fileFreelancer\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`attachment\` \`attachment\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`price\` \`price\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`isApproved\` \`isApproved\` varchar(255) NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`isApproved\` \`isApproved\` varchar(255) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`price\` \`price\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`attachment\` \`attachment\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`fileFreelancer\` \`fileFreelancer\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`file\` \`file\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`duration\` \`duration\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`hourlyRate\` \`hourlyRate\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`title\` \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`message\` \`message\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`complaintMessage\` \`complaintMessage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tags\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
    }

}
