import { TornAPIBase } from './TornAPIBase';
import { Errorable, IAPIKeyInfo } from './Interfaces';

export class ApiKey extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    /**
     * Gets the permission levels and type of the key.
     *
     * @returns The permission level of the key.
     */
    async info(): Promise<Errorable<IAPIKeyInfo>> {
        return this.apiQuery({ route: 'key', selection: 'info', jsonOverride: '' });
    }
}
