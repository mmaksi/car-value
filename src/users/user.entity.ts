import { Report } from 'src/reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  admin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
