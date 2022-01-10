export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date custom scalar type */
  Date: any
}

export interface ActivateUserInput {
  activationKey: Scalars['String']
}

export interface CompanyModel {
  activationKey?: Maybe<Scalars['String']>
  address?: Maybe<Scalars['String']>
  avatarUrl?: Maybe<Scalars['String']>
  companyName?: Maybe<Scalars['String']>
  createdAt: Scalars['Date']
  description?: Maybe<Scalars['String']>
  email: Scalars['String']
  id: Scalars['String']
  interests?: Maybe<Array<Interest>>
  isActive?: Maybe<Scalars['Boolean']>
  isComplete?: Maybe<Scalars['Boolean']>
  onboarding: OnboardingCompany
  refreshToken?: Maybe<Scalars['String']>
  thumbnailUrl?: Maybe<Scalars['String']>
  updatedAt: Scalars['Date']
}

export enum Interest {
  Art = 'ART',
  Coffee = 'COFFEE',
  Culture = 'CULTURE',
  Drinks = 'DRINKS',
  Entertainment = 'ENTERTAINMENT',
  Festival = 'FESTIVAL',
  Food = 'FOOD',
  FreeTime = 'FREE_TIME',
  Music = 'MUSIC',
  Relax = 'RELAX',
  Sport = 'SPORT',
}

export interface LoginInput {
  email: Scalars['String']
  password: Scalars['String']
}

export interface Mutation {
  activateCompany?: Maybe<Tokens>
  activateUser?: Maybe<Tokens>
  loginCompany?: Maybe<Tokens>
  loginUser?: Maybe<Tokens>
  registerCompany?: Maybe<CompanyModel>
  registerUser?: Maybe<UserModel>
  updateCompany?: Maybe<CompanyModel>
  updateUser?: Maybe<UserModel>
}

export interface MutationActivateCompanyArgs {
  input: ActivateUserInput
}

export interface MutationActivateUserArgs {
  input: ActivateUserInput
}

export interface MutationLoginCompanyArgs {
  input: LoginInput
}

export interface MutationLoginUserArgs {
  input: LoginInput
}

export interface MutationRegisterCompanyArgs {
  input: RegistrationCompanyInput
}

export interface MutationRegisterUserArgs {
  input: RegistrationUserInput
}

export interface MutationUpdateCompanyArgs {
  input: UpdateCompanyInput
}

export interface MutationUpdateUserArgs {
  input: UpdateUserInput
}

export enum Onboarding {
  Avatar = 'AVATAR',
  Complete = 'COMPLETE',
  Interests = 'INTERESTS',
  Story = 'STORY',
}

export enum OnboardingCompany {
  Avatar = 'AVATAR',
  Complete = 'COMPLETE',
  Description = 'DESCRIPTION',
  Interests = 'INTERESTS',
  Thumbnail = 'THUMBNAIL',
}

export interface Query {
  getCompany: CompanyModel
  getUser: UserModel
}

export interface QueryGetCompanyArgs {
  id: Scalars['String']
}

export interface QueryGetUserArgs {
  id: Scalars['String']
}

export interface RegistrationCompanyInput {
  address: Scalars['String']
  companyName: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export interface RegistrationUserInput {
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  password: Scalars['String']
}

export interface Tokens {
  accessToken?: Maybe<Scalars['String']>
  refreshToken?: Maybe<Scalars['String']>
}

export interface UpdateCompanyInput {
  address?: Maybe<Scalars['String']>
  avatarUrl?: Maybe<Scalars['String']>
  companyName?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  interests?: Maybe<Array<Interest>>
  thumbnailUrl?: Maybe<Scalars['String']>
}

export interface UpdateUserInput {
  avatarUrl?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  interests?: Maybe<Array<Interest>>
  lastName?: Maybe<Scalars['String']>
  story?: Maybe<Scalars['String']>
}

export interface UserModel {
  activationKey?: Maybe<Scalars['String']>
  avatarUrl?: Maybe<Scalars['String']>
  createdAt: Scalars['Date']
  email: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  id: Scalars['String']
  interests?: Maybe<Array<Interest>>
  isActive?: Maybe<Scalars['Boolean']>
  isComplete?: Maybe<Scalars['Boolean']>
  lastName?: Maybe<Scalars['String']>
  onboarding: Onboarding
  refreshToken?: Maybe<Scalars['String']>
  story?: Maybe<Scalars['String']>
  updatedAt: Scalars['Date']
}
