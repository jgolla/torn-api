import { TornAPIBase } from './TornAPIBase';
import { ICompanyEmployee, ICompanyProfile, IProperty, ITornApiError } from './Interfaces';
import axios from 'axios';

export class Company extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async employees(): Promise<Map<string, ICompanyEmployee> | ITornApiError> {
        return this.apiQueryToMap({ route: 'company', selection: 'employees', jsonOverride: 'company_employees' });
    }

    async profile(id?: string): Promise<ICompanyProfile | ITornApiError> {
        const response = await axios.get(this.buildUri({ route: 'company', selection: 'profile', id: id }));
        if (response.data.error) {
            return response.data.error;
        } else {
            const companyProfile: ICompanyProfile = response.data['company'];
            companyProfile.employees = this.fixStringMap(companyProfile.employees);
            return companyProfile;
        }
    }
}