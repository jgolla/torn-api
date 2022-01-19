import { TornAPIBase } from './TornAPIBase';
import { IProperty, ITornApiError } from './Interfaces';

export class Property extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async multi(endpoints: string[], id?: string): Promise<ITornApiError | Record<string, object>> {
        return this.multiQuery('property', endpoints, id);
    }

    async property(id?: string): Promise<IProperty | ITornApiError> {
        return this.apiQuery({ route: 'property', selection: 'property', id: id });
    }
}
