import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  AfterUpdate,
  ManyToOne,
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

  @ManyToOne(() => List, (list) => list.chor, {
    onDelete: "CASCADE",
  })
  list: List;

  @AfterUpdate()
  updateDates() {
    this.updated_at = new Date();
  }
}
