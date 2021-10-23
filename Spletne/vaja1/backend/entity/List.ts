import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  AfterUpdate,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Chor } from "./Chor";

import { Tag } from "./Tag";

@Entity()
export class List {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @ManyToMany(() => Tag, (tag) => tag.name)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Chor, (chor) => chor.list)
  chor: Chor[];

  @AfterUpdate()
  updateDates() {
    this.updated_at = new Date();
  }
}
