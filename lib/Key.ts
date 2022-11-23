import { TornAPIBase } from './TornAPIBase';
import { Errorable, IKeyInfo } from './Interfaces';

export class Key extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    async info(): Promise<Errorable<IKeyInfo>> {
        return this.multiQuery('key', ['info']) as Promise<Errorable<IKeyInfo>>;
    }
}
