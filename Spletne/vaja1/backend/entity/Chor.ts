import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

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

  @ManyToMany(() => Tag, (chor) => chor.name)
  @JoinTable()
  photos: Tag[];
}
