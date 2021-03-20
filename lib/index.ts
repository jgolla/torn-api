import { Company } from './Company';
import { Faction } from './Faction';
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
    }

    private apiKey = '';
    public setKey(apiKey: string): void {
        this.apiKey = apiKey;
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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public static isError(input: any): input is ITornApiError {
        return (input as ITornApiError).error !== undefined;
    }
}

export { TornAPI, TornInterfaces };
