import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Tag } from "./Tag";

@Entity()
export class List {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: new Date() })
  created_at: Date;

  @ManyToMany(() => Tag, (chor) => chor.name)
  @JoinTable()
  photos: Tag[];
}
