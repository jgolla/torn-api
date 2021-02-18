import axios from 'axios';

import { ITornApiError } from './Interfaces';

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
            return response.data[params.selection];
        }
    }

    protected async apiQueryToMap<T>(params: QueryParams): Promise<Map<string, T> | ITornApiError> {
        const response = await axios.get(this.buildUri(params));
        if (response.data.error) {
            return response.data.error;
        } else {
            const jsonSelection = params.jsonOverride ? response.data[params.jsonOverride] : response.data[params.selection];
            return this.fixStringMap(jsonSelection);
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    protected fixStringMap<V>(mapLike: any): Map<string, V> {
        const returnMap = new Map<string, V>();

        const ids = Object.keys(mapLike);
        for (let i = 0; i < ids.length; i++) {
            returnMap.set(ids[i], mapLike[ids[i]]);
        }

        return returnMap;
    }

    protected buildUri(params: QueryParams): string {
        let uri = `https://api.torn.com/${params.route}/${params.id}?selections=${params.selection}&key=${this.apiKey}`;
        if (params.from) {
            uri += `&from=${params.from}`;
        }

        if (params.to) {
            uri += `&to=${params.to}`;
        }

        return uri;
    }
}

interface QueryParams {
    route: string;
    selection: string;
    id?: string;
    jsonOverride?: string;
    from?: number;
    to?: number;
}