import axios from 'axios';

import { IBank, IEducation, IFactionTree, IGym, IHonor, IItem, IMedal, IOrganizedCrime, IPawnshop, IRacket, IRaid, IStock, ITerritory, ITerritoryWar, ITornApiError, ITornCompany, ITornProperty, ITornStats } from './Interfaces';
import { TornAPIBase } from './TornAPIBase';

export class Torn extends TornAPIBase {

    constructor(apiKey: string) {
        super(apiKey);
    }

    async bank(): Promise<IBank | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'bank' });
    }

    async companies(): Promise<Map<string, ITornCompany> | ITornApiError> {
        const response = await axios.get(this.buildUri({ route: 'torn', selection: 'companies' }));
        if (response.data.error) {
            return response.data.error;
        } else {
            const tornCompany: Map<string, ITornCompany> = this.fixStringMap(response.data['companies']);

            tornCompany.forEach(company => {
                company.positions = this.fixStringMap(company.positions);
                company.specials = this.fixStringMap(company.specials);
                company.stock = this.fixStringMap(company.stock);
            });

            return tornCompany;
        }
    }

    async education(): Promise<Map<string, IEducation> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'education' });
    }

    async factiontree(): Promise<Map<string, Map<string, IFactionTree>> | ITornApiError> {
        const response = await axios.get(this.buildUri({ route: 'torn', selection: 'factiontree' }));
        if (response.data.error) {
            return response.data.error;
        } else {
            const returnTree = new Map<string, Map<string, IFactionTree>>();
            const factionTree: Map<string, unknown> = this.fixStringMap(response.data['factiontree']);
            factionTree.forEach((value, key) => {
                returnTree.set(key, this.fixStringMap(value));
            });

            return returnTree;
        }
    }

    async gyms(): Promise<Map<string, IGym> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'gyms' });
    }

    async honors(): Promise<Map<string, IHonor> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'honors' });
    }

    async items(): Promise<Map<string, IItem> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'items' });
    }

    async medals(): Promise<Map<string, IMedal> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'medals' });
    }

    async organizedcrimes(): Promise<Map<string, IOrganizedCrime> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'organizedcrimes' });
    }

    async pawnshop(): Promise<IPawnshop | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'pawnshop' });
    }

    async properties(): Promise<Map<string, ITornProperty> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'properties' });
    }

    async rackets(): Promise<Map<string, IRacket> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'rackets' });
    }

    async raids(): Promise<Map<string, IRaid> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'raids' });
    }

    async stats(): Promise<ITornStats | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'stats' });
    }

    async stocks(): Promise<Map<string, IStock> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'stocks' });
    }

    async territory(): Promise<Map<string, ITerritory> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'territory' });
    }

    async territorywars(): Promise<Map<string, ITerritoryWar> | ITornApiError> {
        return this.apiQueryToMap({ route: 'torn', selection: 'territorywars' });
    }
}
