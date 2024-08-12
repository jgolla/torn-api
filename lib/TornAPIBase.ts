import axios from 'axios';

import { IKeyValue, ITornApiError } from './Interfaces';

export abstract class TornAPIBase {
    protected apiKey: string;
    protected comment: string;
    protected static GenericAPIError = { code: 0, error: 'Unknown error occurred' };

    constructor(apiKey: string, comment: string) {
        this.apiKey = apiKey;
        this.comment = comment;
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
                let jsonSelection = response.data;
                if (params.jsonOverride) {
                    jsonSelection = response.data[params.jsonOverride];
                } else if (params.selection) {
                    jsonSelection = response.data[params.selection];
                }

                if (jsonSelection) {
                    return jsonSelection;
                } else {
                    return response.data;
                }
            }
        }

        return TornAPIBase.GenericAPIError;
    }

    protected async apiQueryV2<T>(params: QueryParams): Promise<T | ITornApiError> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await axios.get<any>(this.buildUriV2(params));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                let jsonSelection = response.data;
                if (params.jsonOverride) {
                    jsonSelection = response.data[params.jsonOverride];
                } else if (params.selection) {
                    jsonSelection = response.data[params.selection];
                }

                if (jsonSelection) {
                    return jsonSelection;
                } else {
                    return response.data;
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
        const url = new URL(`${params.route}/${params.id ?? ''}`, `https://api.torn.com`);
        url.searchParams.set('selections', params.selection);
        url.searchParams.set('key', this.apiKey);

        if (params.additionalSelections) {
            for (const key in params.additionalSelections) {
                url.searchParams.set(key, params.additionalSelections[key]);
            }
        }

        if (params.from) {
            url.searchParams.set('from', params.from.toString());
        }

        if (params.to) {
            url.searchParams.set('to', params.to.toString());
        }

        if (params.limit) {
            url.searchParams.set('limit', params.limit.toString());
        }

        if (params.timestamp) {
            url.searchParams.set('timestamp', params.timestamp.toString());
        }

        if (this.comment) {
            url.searchParams.set('comment', this.comment);
        }

        return url.toString();
    }

    protected buildUriV2(params: QueryParams): string {
        const url = new URL(`v2/${params.route}/`, `https://api.torn.com`);
        url.searchParams.set('selections', params.selection);
        url.searchParams.set('key', this.apiKey);

        if (params.id) {
            url.searchParams.set('id', params.id.toString());
        }

        if (params.ids) {
            params.ids.forEach((id) => {
                url.searchParams.append('id', id.toString());
            });
        }

        if (params.additionalSelections) {
            for (const key in params.additionalSelections) {
                url.searchParams.set(key, params.additionalSelections[key]);
            }
        }

        if (params.from) {
            url.searchParams.set('from', params.from.toString());
        }

        if (params.to) {
            url.searchParams.set('to', params.to.toString());
        }

        if (params.limit) {
            url.searchParams.set('limit', params.limit.toString());
        }

        if (params.timestamp) {
            url.searchParams.set('timestamp', params.timestamp.toString());
        }

        return url.toString();
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
    id?: string | number;
    ids?: number[];
    jsonOverride?: string;
    from?: number;
    to?: number;
    limit?: number;
    timestamp?: number;
    additionalSelections?: Record<string, string>;
    sort?: string;
}
