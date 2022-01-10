import { registerEnumType } from '@nestjs/graphql'

export enum MutationStatus {
  SUCCESS,
  FAILED
}

registerEnumType(MutationStatus, {
  name: 'MutationStatus',
})

export const allowedMutationStatus: Record<keyof typeof MutationStatus, any> = {
  SUCCESS: 'success',
  FAILED: 'failed',
}

export enum Interest {
  COFFEE,
  SPORT,
  ART,
  CULTURE,
  MUSIC,
  FESTIVAL,
  FOOD,
  ENTERTAINMENT,
  RELAX,
  FREE_TIME,
  DRINKS
}

registerEnumType(Interest, {
  name: 'Interest',
})

export const allowedInterest: Record<keyof typeof Interest, any> = {
  COFFEE: 'Coffee',
  SPORT: 'Sport',
  ART: 'Art',
  CULTURE: 'Culture',
  MUSIC: 'Music',
  FESTIVAL: 'Festival',
  FOOD: 'Food',
  ENTERTAINMENT: 'Entertainment',
  RELAX: 'Relax',
  FREE_TIME: 'Free time',
  DRINKS: 'Drinks',
}

export enum Onboarding {
  STORY,
  INTERESTS,
  AVATAR,
  COMPLETE
}

registerEnumType(Onboarding, {
  name: 'Onboarding',
})

export const allowedOnboarding: Record<keyof typeof Onboarding, any> = {
  STORY: 'story',
  INTERESTS: 'interests',
  AVATAR: 'avatar',
  COMPLETE: 'complete',
}

export enum OnboardingCompany {
  DESCRIPTION,
  INTERESTS,
  AVATAR,
  THUMBNAIL,
  COMPLETE
}

registerEnumType(OnboardingCompany, {
  name: 'OnboardingCompany',
})

export const allowedOnboardingCompany: Record<keyof typeof OnboardingCompany, any> = {
  DESCRIPTION: 'description',
  INTERESTS: 'interests',
  AVATAR: 'avatar',
  THUMBNAIL: 'thumbnail',
  COMPLETE: 'complete',
}