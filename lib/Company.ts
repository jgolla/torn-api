import { TornAPIBase } from './TornAPIBase';
import { ICompanyEmployee, ICompanyProfile, ITornApiError } from './Interfaces';
import axios from 'axios';

export class Company extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async employees(): Promise<ICompanyEmployee[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'company', selection: 'employees', jsonOverride: 'company_employees' }, 'id');
    }

    async profile(id?: string): Promise<ICompanyProfile | ITornApiError> {
        const response = await axios.get(this.buildUri({ route: 'company', selection: 'profile', id: id }));
        if (response.data.error) {
            return response.data.error;
        } else {
            const companyProfile: ICompanyProfile = response.data['company'];
            companyProfile.employees = this.fixStringArray(companyProfile.employees, 'id');
            return companyProfile;
        }
    }
}
