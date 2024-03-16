import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // create a logic to log something before and after insert
  @AfterInsert()
  insertLog() {
    console.log(`Inserted user with id ${this.id}`);
  }

  @AfterUpdate()
  updateLog() {
    console.log(`Updated user with id ${this.id}`);
  }

  @AfterRemove()
  removeLog() {
    console.log(`Removed user with id ${this.id}`);
  }
}
