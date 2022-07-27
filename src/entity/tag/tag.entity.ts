import { changeToSlug } from '@/post';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Account } from '../account';
import { BaseColumn } from '../base';

export enum TAG_TYPE {
  WEAPON = 'WEAPON',
  SERVER = 'SERVER',
  CHARACTER = 'CHARACTER',
  GAME='GAME'
}

export enum TAG_RELATION {
  POST = 'posts',
  PARENT='parent',
  CHILDREN='children'
}

export const TAG_TABLE_NAME = 'tag';
@Entity(TAG_TABLE_NAME)
@Tree('closure-table')
export class Tag extends BaseColumn {
  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ type: 'text' ,nullable:true})
  information: string;

  @Column({type:'text',nullable:true})
  description:string

  @Column({ enum: TAG_TYPE, default: TAG_TYPE.WEAPON })
  type: TAG_TYPE;

  @ManyToMany(() => Account, (account) => account.tags, { cascade: true })
  @JoinTable()
  accounts: Account[];

  @TreeChildren()
  children:Tag[]

  @TreeParent()
  parent?: Tag

  // @BeforeInsert()
  // @BeforeUpdate()
  // insertSlug(){
  //   this.slug = changeToSlug(this.title)
  // }
}
