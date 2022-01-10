import { DiscountModel } from '../../discounts/models/discount.model';
import { Interest, OnboardingCompany } from '../../constants';
export declare class CompanyModel {
    id: string;
    email: string;
    password: string;
    companyName?: string;
    address?: string;
    description?: string;
    avatarUrl?: string;
    thumbnailUrl?: string;
    interests?: Interest[];
    activationKey?: string;
    refreshToken?: string;
    isActive?: boolean;
    isComplete?: boolean;
    createdAt: Date;
    updatedAt: Date;
    get onboarding(): OnboardingCompany;
    setPassword(password: string): Promise<void>;
    shouldBeCompleted(): boolean;
    discounts: DiscountModel[];
}
