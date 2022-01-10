import { Interest, Onboarding } from '../../constants';
export declare class UserModel {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    story?: string;
    avatarUrl?: string;
    interests?: Interest[];
    activationKey?: string;
    refreshToken?: string;
    isActive?: boolean;
    isComplete?: boolean;
    createdAt: Date;
    updatedAt: Date;
    get onboarding(): Onboarding;
    setPassword(password: string): Promise<void>;
    shouldBeCompleted(): boolean;
}
