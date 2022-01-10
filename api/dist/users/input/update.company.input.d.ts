import { Interest } from '../../constants';
export declare class UpdateCompanyInput {
    companyName?: string;
    email?: string;
    description?: string;
    address?: string;
    avatarUrl?: string;
    thumbnailUrl?: string;
    interests?: Interest[];
}
