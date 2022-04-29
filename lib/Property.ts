import { TornAPIBase } from './TornAPIBase';
import { Errorable, IProperty } from './Interfaces';

export class Property extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async multi(endpoints: string[], id?: string): Promise<Errorable<Record<string, object>>> {
        return this.multiQuery('property', endpoints, id);
    }

    async property(id?: string): Promise<Errorable<IProperty>> {
        return this.apiQuery({ route: 'property', selection: 'property', id: id });
    }
}
