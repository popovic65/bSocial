import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserEntity1706374951227 implements MigrationInterface {
    name = 'AddedUserEntity1706374951227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "username_index" ON "users" ("username") `);
        await queryRunner.query(`CREATE TABLE "follows" ("followed_id" integer NOT NULL, "follower_id" integer NOT NULL, CONSTRAINT "PK_b6aa74193794c7c5d09e7423c7f" PRIMARY KEY ("followed_id", "follower_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_48e534a8c1b29ca3a81e8d112b" ON "follows" ("followed_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_54b5dc2739f2dea57900933db6" ON "follows" ("follower_id") `);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_48e534a8c1b29ca3a81e8d112b7" FOREIGN KEY ("followed_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_54b5dc2739f2dea57900933db66" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_54b5dc2739f2dea57900933db66"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_48e534a8c1b29ca3a81e8d112b7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54b5dc2739f2dea57900933db6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48e534a8c1b29ca3a81e8d112b"`);
        await queryRunner.query(`DROP TABLE "follows"`);
        await queryRunner.query(`DROP INDEX "public"."username_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
