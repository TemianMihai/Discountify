import { CompanyModel } from '../../users/models/company.model';
export declare class DiscountModel {
    id: string;
    name: string;
    description: string;
    initialPrice: number;
    discountPercentage: string;
    isVisible?: boolean;
    companyID?: string;
    createdAt: Date;
    updatedAt: Date;
    company?: CompanyModel;
}
