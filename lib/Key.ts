import { TornAPIBase } from './TornAPIBase';
import { Errorable, IApiKeyInfo } from './Interfaces';

export class ApiKey extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    async info(): Promise<Errorable<IApiKeyInfo>> {
        return this.apiQuery({ route: 'key', selection: 'info', jsonOverride: '' });
    }
}
