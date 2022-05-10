import axios from 'axios';

import { IKeyValue, ITornApiError } from './Interfaces';

export abstract class TornAPIBase {

    protected apiKey: string;
    protected static GenericAPIError = { code: 0, error: 'Unknown error occurred' };

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    protected async apiQuery<T>(params: QueryParams): Promise<T | ITornApiError> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await axios.get<any>(this.buildUri(params));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
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

        return TornAPIBase.GenericAPIError;
    }

    protected async apiQueryToArray<T>(params: QueryParams, keyField?: string): Promise<T[] | ITornApiError> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await axios.get<any>(this.buildUri(params));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                let jsonSelection = response.data;
                if (params.jsonOverride) {
                    jsonSelection = response.data[params.jsonOverride];
                } else {
                    jsonSelection = response.data[params.selection];
                }

                if (!jsonSelection) {
                    return [];
                }

                if (keyField) {
                    return this.fixStringArray(jsonSelection, keyField);
                } else {
                    return Object.values(jsonSelection);
                }
            }
        }

        return TornAPIBase.GenericAPIError;
    }

    protected async apiQueryToKeyValueArray(params: QueryParams): Promise<IKeyValue[] | ITornApiError> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await axios.get<any>(this.buildUri(params));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
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

        return TornAPIBase.GenericAPIError;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    protected fixStringArray<T>(mapLike: any, keyField: string): T[] {
        const returnArray: T[] = [];
        if (mapLike) {
            const ids = Object.keys(mapLike);
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const field = mapLike[id];
                if (typeof field === 'object') {
                    if (keyField) {
                        field[keyField] = id;
                    }
                    returnArray.push(field);
                }
            }
        }

        return returnArray;
    }

    protected buildUri(params: QueryParams): string {
        let id = '', from = '', to = '', limit = '', timestamp = '';

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

        if (params.timestamp) {
            timestamp = `&timestamp=${params.timestamp}`;
        }

        return `https://api.torn.com/${params.route}/${id}?selections=${params.selection}&key=${this.apiKey}${from}${to}${limit}${timestamp}`;
    }

    protected async multiQuery<T>(route: string, endpoints: string[], id?: string): Promise<ITornApiError | Record<string, T>> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await axios.get<any>(this.buildUri({ route: route, selection: endpoints.join(','), id: id }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                return response.data;
            }
        }

        return TornAPIBase.GenericAPIError;
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
    timestamp?: number;
}
