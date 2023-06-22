import { TornAPIBase } from './TornAPIBase';
import { Errorable, IAPIKeyInfo } from './Interfaces';

export class ApiKey extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

        /**
     * Gets a list of amory booster items.
     *
     * @returns An array of armory boosters
     */
    async info(): Promise<Errorable<IAPIKeyInfo>> {
        return this.apiQuery({ route: 'key', selection: 'info', jsonOverride: '' });
    }
}
