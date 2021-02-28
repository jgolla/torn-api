import { TornAPIBase } from './TornAPIBase';
import { IProperty, ITornApiError } from './Interfaces';

export class Property extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async property(id?: string): Promise<IProperty | ITornApiError> {
        return this.apiQuery({ route: 'property', selection: 'property', id: id });
    }
}
