import axios from 'axios';

import { IKeyValue, ITornApiError } from './Interfaces';

export abstract class TornAPIBase {

    protected apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    protected async apiQuery<T>(params: QueryParams): Promise<T | ITornApiError> {
        const response = await axios.get(this.buildUri(params));
        if (response.data.error) {
            return response.data.error;
        } else {
            if (params.jsonOverride === '') {
                return response.data;
            } else if (params.jsonOverride) {
                return response.data[params.jsonOverride];
            } else {
                if (params.selection === '') {
                    return response.data;
                } else {
                    return response.data[params.selection];
                }
            }
        }
    }

    protected async apiQueryToArray<T>(params: QueryParams, keyField?: string): Promise<T[] | ITornApiError> {
        const response = await axios.get(this.buildUri(params));
        if (response.data.error) {
            return response.data.error;
        } else {
            let jsonSelection = response.data;
            if (params.jsonOverride) {
                jsonSelection = response.data[params.jsonOverride];
            } else {
                jsonSelection = response.data[params.selection];
            }

            if (keyField) {
                return this.fixStringArray(jsonSelection, keyField);
            } else {
                return Object.values(jsonSelection);
            }
        }
    }

    protected async apiQueryToKeyValueArray(params: QueryParams): Promise<IKeyValue[] | ITornApiError> {
        const response = await axios.get(this.buildUri(params));
        if (response.data.error) {
            return response.data.error;
        } else {
            const types: IKeyValue[] = [];
            const ids = Object.keys(response.data[params.selection]);
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const name = response.data[params.selection][id];
                types.push({ key: id, value: name });
            }

            return types;
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    protected fixStringArray<T>(mapLike: any, keyField: string): T[] {
        const returnArray: T[] = [];
        const ids = Object.keys(mapLike);
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const field = mapLike[id];
            if (typeof field === 'object') {
                field[keyField] = id;
                returnArray.push(field);
            }
        }

        return returnArray;
    }

    protected buildUri(params: QueryParams): string {
        let id = '', from = '', to = '', limit = '';

        if (params.id) {
            id = params.id;
        }

        if (params.from) {
            from = `&from=${params.from}`;
        }

        if (params.to) {
            to = `&to=${params.to}`;
        }

        if (params.limit) {
            limit = `&limit=${params.limit}`;
        }

        return `https://api.torn.com/${params.route}/${id}?selections=${params.selection}&key=${this.apiKey}${from}${to}${limit}`;
    }
}

interface QueryParams {
    route: string;
    selection: string;
    id?: string;
    jsonOverride?: string;
    from?: number;
    to?: number;
    limit?: number;
}
