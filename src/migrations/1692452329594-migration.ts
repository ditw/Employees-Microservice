import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1692452329594 implements MigrationInterface {

    name = 'Migration1692452329594';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "employees" (
              "isActive" boolean NOT NULL DEFAULT true, 
              "isArchived" boolean NOT NULL DEFAULT false, 
              "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
              "updatedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
              "isDeleted" boolean NOT NULL DEFAULT false, 
              "id" SERIAL NOT NULL,
              "name" character varying(255) NOT NULL, 
              "salary" decimal(12,2) NOT NULL, 
              "currency" character varying(3) NOT NULL, 
              "department" character varying(255) NOT NULL,
              "sub_department" character varying(255) DEFAULT NULL,
              "on_contract" boolean NOT NULL DEFAULT true,
              CONSTRAINT "PK_1692452329594" PRIMARY KEY ("id")
              )
          `);        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE "employees"
        `);        
    }

}
