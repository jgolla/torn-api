import axios from 'axios';

import { TornAPIBase } from './TornAPIBase';
import { IMarketItem, IPointsMarket, ITornApiError } from './Interfaces';

export class ItemMarket extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async all(id: string): Promise<IMarketItem[] | ITornApiError> {
        const response = await axios.get<{ error?: ITornApiError, bazaar: IMarketItem[], itemmarket: IMarketItem[] }>(this.buildUri({ route: 'market', selection: 'bazaar,itemmarket', id: id }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data.error) {
                return response.data.error;
            } else {
                return [...response.data.bazaar, ...response.data.itemmarket];
            }
        }
    }

    async bazaar(id: string): Promise<IMarketItem[] | ITornApiError> {
        return this.apiQuery({ route: 'market', selection: 'bazaar', id: id });
    }

    async itemmarket(id: string): Promise<IMarketItem[] | ITornApiError> {
        return this.apiQuery({ route: 'market', selection: 'itemmarket', id: id });
    }

    async pointsmarket(): Promise<IPointsMarket[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'market', selection: 'pointsmarket' }, 'id');
    }
}
