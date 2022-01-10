"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedOnboardingCompany = exports.OnboardingCompany = exports.allowedOnboarding = exports.Onboarding = exports.allowedInterest = exports.Interest = exports.allowedMutationStatus = exports.MutationStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var MutationStatus;
(function (MutationStatus) {
    MutationStatus[MutationStatus["SUCCESS"] = 0] = "SUCCESS";
    MutationStatus[MutationStatus["FAILED"] = 1] = "FAILED";
})(MutationStatus = exports.MutationStatus || (exports.MutationStatus = {}));
graphql_1.registerEnumType(MutationStatus, {
    name: 'MutationStatus',
});
exports.allowedMutationStatus = {
    SUCCESS: 'success',
    FAILED: 'failed',
};
var Interest;
(function (Interest) {
    Interest[Interest["COFFEE"] = 0] = "COFFEE";
    Interest[Interest["SPORT"] = 1] = "SPORT";
    Interest[Interest["ART"] = 2] = "ART";
    Interest[Interest["CULTURE"] = 3] = "CULTURE";
    Interest[Interest["MUSIC"] = 4] = "MUSIC";
    Interest[Interest["FESTIVAL"] = 5] = "FESTIVAL";
    Interest[Interest["FOOD"] = 6] = "FOOD";
    Interest[Interest["ENTERTAINMENT"] = 7] = "ENTERTAINMENT";
    Interest[Interest["RELAX"] = 8] = "RELAX";
    Interest[Interest["FREE_TIME"] = 9] = "FREE_TIME";
    Interest[Interest["DRINKS"] = 10] = "DRINKS";
})(Interest = exports.Interest || (exports.Interest = {}));
graphql_1.registerEnumType(Interest, {
    name: 'Interest',
});
exports.allowedInterest = {
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
};
var Onboarding;
(function (Onboarding) {
    Onboarding[Onboarding["STORY"] = 0] = "STORY";
    Onboarding[Onboarding["INTERESTS"] = 1] = "INTERESTS";
    Onboarding[Onboarding["AVATAR"] = 2] = "AVATAR";
    Onboarding[Onboarding["COMPLETE"] = 3] = "COMPLETE";
})(Onboarding = exports.Onboarding || (exports.Onboarding = {}));
graphql_1.registerEnumType(Onboarding, {
    name: 'Onboarding',
});
exports.allowedOnboarding = {
    STORY: 'story',
    INTERESTS: 'interests',
    AVATAR: 'avatar',
    COMPLETE: 'complete',
};
var OnboardingCompany;
(function (OnboardingCompany) {
    OnboardingCompany[OnboardingCompany["DESCRIPTION"] = 0] = "DESCRIPTION";
    OnboardingCompany[OnboardingCompany["INTERESTS"] = 1] = "INTERESTS";
    OnboardingCompany[OnboardingCompany["AVATAR"] = 2] = "AVATAR";
    OnboardingCompany[OnboardingCompany["THUMBNAIL"] = 3] = "THUMBNAIL";
    OnboardingCompany[OnboardingCompany["COMPLETE"] = 4] = "COMPLETE";
})(OnboardingCompany = exports.OnboardingCompany || (exports.OnboardingCompany = {}));
graphql_1.registerEnumType(OnboardingCompany, {
    name: 'OnboardingCompany',
});
exports.allowedOnboardingCompany = {
    DESCRIPTION: 'description',
    INTERESTS: 'interests',
    AVATAR: 'avatar',
    THUMBNAIL: 'thumbnail',
    COMPLETE: 'complete',
};
//# sourceMappingURL=constants.js.map