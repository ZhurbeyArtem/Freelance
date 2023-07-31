import { MigrationInterface, QueryRunner } from "typeorm";

export class FreelancerConfirm1686152386591 implements MigrationInterface {
    name = 'FreelancerConfirm1686152386591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`employerConfirm\` \`freelancerConfirm\` varchar(255) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bid\` CHANGE \`isApproved\` \`isApproved\` varchar(255) NOT NULL DEFAULT '0'`);
    }

}
