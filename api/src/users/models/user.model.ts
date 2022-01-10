import { Field, ObjectType } from '@nestjs/graphql'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { isEmpty, isNil, reduce } from 'ramda'

import { Interest, Onboarding } from '../../constants'

@ObjectType()
@Entity({ name: 'users' })
export class UserModel {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field({ nullable: false })
  @Column('varchar', { length: 255 })
  email: string

  @Column('varchar', { length: 255 })
  password: string

  @Field({ nullable: true })
  @Column('varchar', { length: 255, name: 'first_name', nullable: true })
  firstName?: string

  @Field({ nullable: true })
  @Column('varchar', { length: 255, name: 'last_name', nullable: true })
  lastName?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  story?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true, name: 'avatar_url' })
  avatarUrl?: string

  @Field((type) => [Interest], { nullable: true })
  @Column({
    type: 'enum',
    enum: Interest,
    array: true,
    nullable: true,
  })
  interests?: Interest[]

  @Field({ nullable: true })
  @Column('varchar', { length: 255, name: 'activation_key', nullable: true })
  activationKey?: string

  @Field({ nullable: true })
  @Column('varchar', { length: 255, name: 'refresh_token', nullable: true })
  refreshToken?: string

  @Field({ nullable: true })
  @Column('boolean', { default: false, name: 'is_active' })
  isActive?: boolean

  @Field({ nullable: true })
  @Column('boolean', { default: false, nullable: true, name: 'is_complete' })
  isComplete?: boolean

  @Field({ nullable: false })
  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date

  @Field({ nullable: false })
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  updatedAt: Date

  @Field(() => Onboarding)
  get onboarding(): Onboarding {
    const field = reduce(
      (acc, field) => (!isNil(acc) ? acc : !isNil(field[0]) && !isEmpty(field[0]) ? field[1] : null),
      null,
      [
        [this.story, Onboarding.STORY],
        [this.interests, Onboarding.INTERESTS],
        [this.avatarUrl, Onboarding.AVATAR],
      ],
    )

    return field || Onboarding.COMPLETE
  }

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }

  shouldBeCompleted(): boolean {
    return reduce((result, field) => result && !isNil(field) && !isEmpty(field), true, [
      this.story,
      this.interests,
      this.avatarUrl,
    ])
  }
}
