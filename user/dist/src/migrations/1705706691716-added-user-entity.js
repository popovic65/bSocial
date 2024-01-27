"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedUserEntity1705706691716 = void 0;
class AddedUserEntity1705706691716 {
    constructor() {
        this.name = 'AddedUserEntity1705706691716';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "follows" ("follower_id" integer NOT NULL, "followed_id" integer NOT NULL, CONSTRAINT "PK_b6aa74193794c7c5d09e7423c7f" PRIMARY KEY ("follower_id", "followed_id"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_54b5dc2739f2dea57900933db6" ON "follows" ("follower_id") `);
            yield queryRunner.query(`CREATE INDEX "IDX_48e534a8c1b29ca3a81e8d112b" ON "follows" ("followed_id") `);
            yield queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_54b5dc2739f2dea57900933db66" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_48e534a8c1b29ca3a81e8d112b7" FOREIGN KEY ("followed_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_48e534a8c1b29ca3a81e8d112b7"`);
            yield queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_54b5dc2739f2dea57900933db66"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_48e534a8c1b29ca3a81e8d112b"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_54b5dc2739f2dea57900933db6"`);
            yield queryRunner.query(`DROP TABLE "follows"`);
        });
    }
}
exports.AddedUserEntity1705706691716 = AddedUserEntity1705706691716;
