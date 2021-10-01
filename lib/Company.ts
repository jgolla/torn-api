import { TornAPIBase } from './TornAPIBase';
import { ICompany, ICompanyEmployee, ICompanyProfile, ITornApiError } from './Interfaces';
import axios from 'axios';

export class Company extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async applications(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async companies(id: string): Promise<ICompany[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'company', selection: 'companies', jsonOverride: 'company', id: id });
    }

    async detailed(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async employees(id?: string): Promise<ICompanyEmployee[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'company', selection: 'employees', jsonOverride: 'company_employees', id: id }, 'id');
    }

    async news(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async newsfull(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async profile(id?: string): Promise<ICompanyProfile | ITornApiError> {
        const response = await axios.get<{ error?: ITornApiError, company: ICompanyProfile }>(this.buildUri({ route: 'company', selection: 'profile', id: id }));
        if (response.data.error) {
            return response.data.error;
        } else {
            const companyProfile: ICompanyProfile = response.data.company;
            companyProfile.employees = this.fixStringArray(companyProfile.employees, 'id');
            return companyProfile;
        }
    }

    async stock(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }
}
