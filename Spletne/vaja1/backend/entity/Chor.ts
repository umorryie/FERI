import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  AfterUpdate,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { List } from "./List";
import { Tag } from "./Tag";

@Entity()
export class Chor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column()
  until: Date;

  @Column()
  name: string;

  @Column({ default: false })
  done: boolean;

  @Column({ default: new Date() })
  updated_at: Date;

  @ManyToMany(() => Tag, (tag) => tag.name)
  @JoinTable()
  tags: Tag[];

  @OneToOne(() => List, (list) => list.chors)
  @JoinColumn()
  list: List;

  @AfterUpdate()
  updateDates() {
    this.updated_at = new Date();
  }
}
