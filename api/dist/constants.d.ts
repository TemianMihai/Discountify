export declare enum MutationStatus {
    SUCCESS = 0,
    FAILED = 1
}
export declare const allowedMutationStatus: Record<keyof typeof MutationStatus, any>;
export declare enum Interest {
    COFFEE = 0,
    SPORT = 1,
    ART = 2,
    CULTURE = 3,
    MUSIC = 4,
    FESTIVAL = 5,
    FOOD = 6,
    ENTERTAINMENT = 7,
    RELAX = 8,
    FREE_TIME = 9,
    DRINKS = 10
}
export declare const allowedInterest: Record<keyof typeof Interest, any>;
export declare enum Onboarding {
    STORY = 0,
    INTERESTS = 1,
    AVATAR = 2,
    COMPLETE = 3
}
export declare const allowedOnboarding: Record<keyof typeof Onboarding, any>;
export declare enum OnboardingCompany {
    DESCRIPTION = 0,
    INTERESTS = 1,
    AVATAR = 2,
    THUMBNAIL = 3,
    COMPLETE = 4
}
export declare const allowedOnboardingCompany: Record<keyof typeof OnboardingCompany, any>;
