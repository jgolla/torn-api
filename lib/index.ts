import axios from 'axios';

import { Company } from './Company';
import { Faction } from './Faction';
import { ItemMarket } from './ItemMarket';
import { ITornApiError } from './Interfaces';
import { Property } from './Property';
import { Torn } from './Torn';
import { User } from './User';
import { Key } from './Key';
import * as TornInterfaces from './Interfaces';

class TornAPI {
    constructor(apiKey?: string, comment?: string) {
        if (apiKey) {
            this.setKey(apiKey);
        }

        if (comment) {
            this.setComment(comment);
        }

        // Add a response interceptor
        axios.interceptors.response.use(
            response => {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // just pass thru
                return response;
            },
            error => {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // return in the form of ITornApiError
                if (error.response) {
                    return {
                        data: {
                            error: {
                                code: error.response.status,
                                error: error.response.statusText,
                            },
                        },
                    };
                } else {
                    // protect against no repsonse being returned
                    return { data: { error: { code: 500, error: 'Unknown error occurred.' } } };
                }
            }
        );
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
            this._key = null;
        }
    }

    private comment = '';
    public setComment(comment: string): void {
        // only reset if the comment has changed
        if (this.comment !== comment) {
            this.comment = comment;

            // when the comment changes, reset all the internals
            this._torn = null;
            this._user = null;
            this._faction = null;
            this._property = null;
            this._itemmarket = null;
            this._company = null;
            this._key = null;
        }
    }

    private _torn: Torn | null = null;
    get torn(): Torn {
        if (!this._torn) {
            this._torn = new Torn(this.apiKey, this.comment);
        }

        return this._torn;
    }

    private _user: User | null = null;
    get user(): User {
        if (!this._user) {
            this._user = new User(this.apiKey, this.comment);
        }

        return this._user;
    }

    private _faction: Faction | null = null;
    get faction(): Faction {
        if (!this._faction) {
            this._faction = new Faction(this.apiKey, this.comment);
        }

        return this._faction;
    }

    private _property: Property | null = null;
    get property(): Property {
        if (!this._property) {
            this._property = new Property(this.apiKey, this.comment);
        }

        return this._property;
    }

    private _company: Company | null = null;
    get company(): Company {
        if (!this._company) {
            this._company = new Company(this.apiKey, this.comment);
        }

        return this._company;
    }

    private _itemmarket: ItemMarket | null = null;
    get itemmarket(): ItemMarket {
        if (!this._itemmarket) {
            this._itemmarket = new ItemMarket(this.apiKey, this.comment);
        }

        return this._itemmarket;
    }

    private _key: Key | null = null;
    get key(): Key {
        if (!this._key) {
            this._key = new Key(this.apiKey, this.comment);
        }

        return this._key;
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
