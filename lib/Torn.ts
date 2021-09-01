import axios from 'axios';

import { IBank, ITornGym, IHonor, IItem, IMedal, IOrganisedCrime as IOrganisedCrime, IPawnshop, IRacket, IRaid, IStock, ITerritory, ITerritoryWar, ITornApiError, ITornCompany, ITornProperty, ITornStats, IFactionTree, IKeyValue, ICard, IStockDetail, ITornEducation, IPokerTable } from './Interfaces';
import { TornAPIBase } from './TornAPIBase';

export class Torn extends TornAPIBase {

    constructor(apiKey: string) {
        super(apiKey);
    }

    async bank(): Promise<IBank | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'bank' });
    }

    async cards(): Promise<ICard[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'cards' }, 'id');
    }

    async companies(): Promise<ITornCompany[] | ITornApiError> {
        const response = await axios.get(this.buildUri({ route: 'torn', selection: 'companies' }));
        if (response.data.error) {
            return response.data.error;
        } else {
            const tornCompany: ITornCompany[] = this.fixStringArray(response.data['companies'], 'id');

            tornCompany.forEach(company => {
                company.positions = this.fixStringArray(company.positions, 'name');
                company.specials = this.fixStringArray(company.specials, 'name');
                company.stock = this.fixStringArray(company.stock, 'name');
            });

            return tornCompany;
        }
    }

    async education(): Promise<ITornEducation[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'education' }, 'id');
    }

    async factiontree(): Promise<IFactionTree[] | ITornApiError> {
        const response = await axios.get(this.buildUri({ route: 'torn', selection: 'factiontree' }));
        if (response.data.error) {
            return response.data.error;
        } else {
            const returnTree: IFactionTree[] = this.fixStringArray(response.data['factiontree'], 'id');
            returnTree.forEach(item => {
                item.branch = this.fixStringArray(item, 'id');
            });

            return returnTree;
        }
    }

    async gyms(): Promise<ITornGym[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'gyms' }, 'id');
    }

    async honors(): Promise<IHonor[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'honors' }, 'id');
    }

    async items(): Promise<IItem[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'items' }, 'id');
    }

    async logcategories(): Promise<IKeyValue[] | ITornApiError> {
        return this.apiQueryToKeyValueArray({ route: 'torn', selection: 'logcategories' });
    }

    async logtypes(): Promise<IKeyValue[] | ITornApiError> {
        return this.apiQueryToKeyValueArray({ route: 'torn', selection: 'logtypes' });
    }

    async medals(): Promise<IMedal[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'medals' }, 'id');
    }

    async organisedcrimes(): Promise<IOrganisedCrime[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'organisedcrimes' }, 'id');
    }

    async pawnshop(): Promise<IPawnshop | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'pawnshop' });
    }

    async properties(): Promise<ITornProperty[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'properties' }, 'id');
    }

    async pokertables(): Promise<IPokerTable[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'pokertables' }, 'id');
    }

    async rackets(): Promise<IRacket[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'rackets' }, 'id');
    }

    async raids(): Promise<IRaid[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'raids' }, 'id');
    }

    async stats(): Promise<ITornStats | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'stats' });
    }

    async stocks(id?: string): Promise<IStock[] | IStockDetail | ITornApiError> {
        if (id) {
            const response = await axios.get(this.buildUri({ route: 'torn', selection: 'stocks', id: id }));
            if (response.data.error) {
                return response.data.error;
            } else {
                return response.data['stocks'][id];
            }
        } else {
            return this.apiQueryToArray({ route: 'torn', selection: 'stocks' });
        }
    }

    async timestamp(): Promise<number | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'timestamp' });
    }

    async territory(): Promise<ITerritory[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'territory' }, 'id');
    }

    async territorywars(): Promise<ITerritoryWar[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'territorywars' }, 'id');
    }
}
