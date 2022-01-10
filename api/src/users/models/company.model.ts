import { Field, ObjectType } from '@nestjs/graphql'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { isEmpty, isNil, reduce } from 'ramda'

import { DiscountModel } from '../../discounts/models/discount.model'

import { Interest, OnboardingCompany } from '../../constants'

@ObjectType()
@Entity({ name: 'companies' })
export class CompanyModel {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field({ nullable: false })
  @Column('varchar', { length: 255 })
  email: string

  @Column('varchar', { length: 255 })
  password: string

  @Field({ nullable: true })
  @Column('varchar', { length: 255, name: 'company_name', nullable: true })
  companyName?: string

  @Field({ nullable: true })
  @Column('varchar', { length: 255, name: 'address', nullable: true })
  address?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true, name: 'avatar_url' })
  avatarUrl?: string

  @Field({ nullable: true })
  @Column('text', { nullable: true, name: 'thumbnail_url' })
  thumbnailUrl?: string

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

  @Field(() => OnboardingCompany)
  get onboarding(): OnboardingCompany {
    const field = reduce(
      (acc, field) => (!isNil(acc) ? acc : !isNil(field[0]) && !isEmpty(field[0]) ? field[1] : null),
      null,
      [
        [this.description, OnboardingCompany.DESCRIPTION],
        [this.interests, OnboardingCompany.INTERESTS],
        [this.avatarUrl, OnboardingCompany.AVATAR],
        [this.thumbnailUrl, OnboardingCompany.THUMBNAIL],

      ],
    )

    return field || OnboardingCompany.COMPLETE
  }

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }

  shouldBeCompleted(): boolean {
    return reduce((result, field) => result && !isNil(field) && !isEmpty(field), true, [
      this.description,
      this.interests,
      this.avatarUrl,
      this.thumbnailUrl,
    ])
  }

  // Associations
  @OneToMany(() => DiscountModel, (discount) => discount.company, {
    cascade: true,
  })
  discounts: DiscountModel[]
}
