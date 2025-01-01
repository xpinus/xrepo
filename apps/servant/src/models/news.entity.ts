import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  uuid: string;

  @Column('text')
  title: string;

  @Column('text')
  desc: string;

  @Column('text')
  url: string;

  @Column('text')
  tag: string;

  @Column('text')
  language: string;

  @Column('text')
  country: string;

  @Column('text')
  source: string;

  @Column('text')
  source_href: string;

  @Column('text')
  zh_title: string;

  @Column('text')
  zh_desc: string;

  @Column('text')
  en_title: string;

  @Column('text')
  en_desc: string;

  @Column('text')
  content: string;

  @Column('boolean')
  focus: boolean;

  @CreateDateColumn()
  create_time: Date;
}
