import { MigrationInterface, QueryRunner } from "typeorm";

export class FreelancerFile1686003763039 implements MigrationInterface {
    name = 'FreelancerFile1686003763039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job\` ADD \`fileFreelancer\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job\` CHANGE \`file\` \`file\` varchar(255) NULL`);
    }

}
