import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { List } from "./List";
import { Chor } from "./Chor";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column()
  name: string;

  @ManyToMany(() => List, (list) => list.tags, {
    onDelete: "CASCADE",
  })
  list: List;

  @ManyToMany(() => Chor, (chor) => chor.tags, {
    onDelete: "CASCADE",
  })
  chor: List;
}
