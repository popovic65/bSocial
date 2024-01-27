import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from "typeorm";
import bcrypt from "bcryptjs";
import Model from "./model.entity";

@Entity("users")
export class User extends Model {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index("username_index")
  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: "follows",
    joinColumn: { name: "followed_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "follower_id", referencedColumnName: "id" },
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return { ...this, password: undefined };
  }
}
