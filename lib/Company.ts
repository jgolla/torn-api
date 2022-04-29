import { TornAPIBase } from './TornAPIBase';
import { ICompanyDetailed, ICompany, ICompanyEmployee, ICompanyProfile, ITornApiError, INews, ICompanyStock, Errorable } from './Interfaces';
import axios from 'axios';

export class Company extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async multi(endpoints: string[], id?: string): Promise<Errorable<Record<string, object>>> {
        return this.multiQuery('company', endpoints, id);
    }

    async applications(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async companies(id: string): Promise<Errorable<ICompany[]>> {
        return this.apiQueryToArray({ route: 'company', selection: 'companies', jsonOverride: 'company', id: id });
    }

    async detailed(): Promise<Errorable<ICompanyDetailed>> {
        return this.apiQuery({ route: 'company', selection: 'detailed', jsonOverride: 'company_detailed' });
    }

    async employees(id?: string): Promise<Errorable<ICompanyEmployee[]>> {
        return this.apiQueryToArray({ route: 'company', selection: 'employees', jsonOverride: 'company_employees', id: id }, 'id');
    }

    async news(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'company', selection: 'news', from: from, to: to }, 'id');
    }

    async newsfull(from?: number, to?: number): Promise<Errorable<INews[]>> {
        return this.apiQueryToArray({ route: 'company', selection: 'newsfull', jsonOverride: 'news', from: from, to: to }, 'id');
    }

    async profile(id?: string): Promise<Errorable<ICompanyProfile>> {
        const response = await axios.get<{ error?: ITornApiError, company: ICompanyProfile }>(this.buildUri({ route: 'company', selection: 'profile', id: id }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                const companyProfile: ICompanyProfile = response.data.company;
                companyProfile.employees = this.fixStringArray(companyProfile.employees, 'id');
                return companyProfile;
            }
        }

        return TornAPIBase.GenericAPIError;
    }

    async stock(): Promise<Errorable<ICompanyStock[]>> {
        return this.apiQueryToArray({ route: 'company', selection: 'stock', jsonOverride: 'company_stock' }, 'name');
    }
}
