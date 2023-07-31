import { MigrationInterface, QueryRunner } from "typeorm";

export class BidStatus1685973147806 implements MigrationInterface {
    name = 'BidStatus1685973147806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`status\` \`isApproved\` varchar(255) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`isApproved\` \`status\` varchar(255) NOT NULL DEFAULT '0'`);
    }

}
