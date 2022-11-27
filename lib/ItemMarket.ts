import axios from 'axios';

import { TornAPIBase } from './TornAPIBase';
import { Errorable, IMarketItem, IPointsMarket, ITornApiError } from './Interfaces';

export class ItemMarket extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    async multi(endpoints: string[], id?: string): Promise<Errorable<Record<string, object>>> {
        return this.multiQuery('market', endpoints, id);
    }

    async all(id: string): Promise<Errorable<IMarketItem[]>> {
        const response = await axios.get<{ error?: ITornApiError, bazaar: IMarketItem[], itemmarket: IMarketItem[] }>(this.buildUri({ route: 'market', selection: 'bazaar,itemmarket', id: id }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                return [...response.data.bazaar, ...response.data.itemmarket];
            }

            return TornAPIBase.GenericAPIError;
        }
    }

    async bazaar(id: string): Promise<Errorable<IMarketItem[]>> {
        return this.apiQuery({ route: 'market', selection: 'bazaar', id: id });
    }

    async itemmarket(id: string): Promise<Errorable<IMarketItem[]>> {
        return this.apiQuery({ route: 'market', selection: 'itemmarket', id: id });
    }

    async pointsmarket(): Promise<Errorable<IPointsMarket[]>> {
        return this.apiQueryToArray({ route: 'market', selection: 'pointsmarket' }, 'id');
    }
}
