import axios from 'axios';

import { Company } from './Company';
import { Faction } from './Faction';
import { ItemMarket } from './ItemMarket';
import { ITornApiError } from './Interfaces';
import { Property } from './Property';
import { Torn } from './Torn';
import { User } from './User';
import * as TornInterfaces from './Interfaces';

class TornAPI {
    constructor(apiKey?: string) {
        if (apiKey) {
            this.setKey(apiKey);
        }

        // Add a response interceptor
        axios.interceptors.response.use(response => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // just pass thru
            return response;
        }, error => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // return in the form of ITornApiError
            return { data: { error: { code: error.response.status, error: error.response.statusText } } };
        });
    }

    private apiKey = '';
    public setKey(apiKey: string): void {
        // only reset if the key has changed
        if (this.apiKey !== apiKey) {
            this.apiKey = apiKey;

            // when the key changes, reset all the internals
            this._torn = null;
            this._user = null;
            this._faction = null;
            this._property = null;
            this._itemmarket = null;
            this._company = null;
        }
    }

    private _torn: Torn | null = null;
    get torn(): Torn {
        if (!this._torn) {
            this._torn = new Torn(this.apiKey);
        }

        return this._torn;
    }

    private _user: User | null = null;
    get user(): User {
        if (!this._user) {
            this._user = new User(this.apiKey);
        }

        return this._user;
    }

    private _faction: Faction | null = null;
    get faction(): Faction {
        if (!this._faction) {
            this._faction = new Faction(this.apiKey);
        }

        return this._faction;
    }

    private _property: Property | null = null;
    get property(): Property {
        if (!this._property) {
            this._property = new Property(this.apiKey);
        }

        return this._property;
    }

    private _company: Company | null = null;
    get company(): Company {
        if (!this._company) {
            this._company = new Company(this.apiKey);
        }

        return this._company;
    }

    private _itemmarket: ItemMarket | null = null;
    get itemmarket(): ItemMarket {
        if (!this._itemmarket) {
            this._itemmarket = new ItemMarket(this.apiKey);
        }

        return this._itemmarket;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public static isError(input: any): input is ITornApiError {
        if (input) {
            const apiError = input as ITornApiError;
            if (apiError) {
                return apiError.error !== undefined;
            }

            return false;
        }

        return true;
    }
}

export { TornAPI, TornInterfaces, Torn, Company, Faction, Property, User, ItemMarket };
