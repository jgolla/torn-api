import { TornAPIBase } from './TornAPIBase';
import { Errorable, IKeyInfo } from './Interfaces';

export class Key extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    async info(): Promise<Errorable<IKeyInfo>> {
        // https://api.torn.com/key/?selections=info&key=jyGWkKySd6nnE5YK
        return this.apiQuery({ route: 'key', selection: 'info' });
    }
}
