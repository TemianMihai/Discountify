import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { CompanyModel } from '../../users/models/company.model'

@ObjectType()
@Entity({ name: 'discounts' })
export class DiscountModel {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field({ nullable: false })
  @Column('varchar', { length: 255 })
  name: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description: string

  @Field({ nullable: true })
  @Column('integer', { nullable: true, name: 'initial_price' })
  initialPrice: number

  @Field({ nullable: true })
  @Column('text', { nullable: true, name: 'discount_percentage' })
  discountPercentage: string

  @Field({ nullable: true })
  @Column('boolean', { default: false, name: 'is_visible' })
  isVisible?: boolean

  @Column({ name: 'company_id', nullable: true })
  companyID?: string

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

  // Associations
  @Field(() => CompanyModel, { nullable: true })
  @ManyToOne(() => CompanyModel, (company) => company.discounts, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company?: CompanyModel
}
