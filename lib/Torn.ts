import axios from 'axios';

import { IBank, ITornGym, IHonor, IItem, IMedal, IOrganisedCrime, IPawnshop, IRacket, IRaid, IStock, ITerritory, ITerritoryWar, ITornApiError, ITornCompany, ITornProperty, ITornStats, IFactionTree, IKeyValue, ICard, IStockDetail, ITornEducation, IPokerTable, IChainReport, IRankedWar, IRankedWarReport, ITerritoryDetail } from './Interfaces';
import { TornAPIBase } from './TornAPIBase';

export class Torn extends TornAPIBase {

    constructor(apiKey: string) {
        super(apiKey);
    }

    async multi(endpoints: string[], id?: string): Promise<ITornApiError | Record<string, object>> {
        return this.multiQuery('torn', endpoints, id);
    }

    async bank(): Promise<IBank | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'bank' });
    }

    async cards(): Promise<ICard[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'cards' }, 'id');
    }

    async chainreport(id: number): Promise<IChainReport | ITornApiError> {
        const response = await axios.get<{ error?: ITornApiError, chainreport: IChainReport }>(this.buildUri({ route: 'torn', selection: 'chainreport', id: id ? id.toString() : '' }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                const factionReturn: IChainReport = response.data.chainreport;
                factionReturn.members = this.fixStringArray(factionReturn.members, '');
                return factionReturn;
            }

            return TornAPIBase.GenericAPIError;
        }
    }

    async companies(): Promise<ITornCompany[] | ITornApiError> {
        const response = await axios.get<{ error?: ITornApiError, companies: ITornCompany }>(this.buildUri({ route: 'torn', selection: 'companies' }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                const tornCompany: ITornCompany[] = this.fixStringArray(response.data['companies'], 'id');

                tornCompany.forEach(company => {
                    company.positions = this.fixStringArray(company.positions, 'name');
                    company.specials = this.fixStringArray(company.specials, 'name');
                    company.stock = this.fixStringArray(company.stock, 'name');
                });

                return tornCompany;
            }

            return TornAPIBase.GenericAPIError;
        }
    }

    async education(): Promise<ITornEducation[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'education' }, 'id');
    }

    async factiontree(): Promise<IFactionTree[] | ITornApiError> {
        const response = await axios.get<{ error?: ITornApiError, factiontree: IFactionTree }>(this.buildUri({ route: 'torn', selection: 'factiontree' }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                const returnTree: IFactionTree[] = this.fixStringArray(response.data.factiontree, 'id');
                returnTree.forEach(item => {
                    item.branch = this.fixStringArray(item, 'id');
                });

                return returnTree;
            }

            return TornAPIBase.GenericAPIError;
        }
    }

    async gyms(): Promise<ITornGym[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'gyms' }, 'id');
    }

    async honors(id?: string): Promise<IHonor[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'honors', id: id }, 'id');
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

    async rankedwars(): Promise<IRankedWar[] | ITornApiError> {
        const response = await axios.get<{ error?: ITornApiError, rankedwars: IRankedWar[] }>(this.buildUri({ route: 'torn', selection: 'rankedwars' }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                const rankedWar: IRankedWar[] = this.fixStringArray(response.data.rankedwars, 'id');
                rankedWar.forEach(item => {
                    item.factions = this.fixStringArray(item.factions, 'id');
                });

                return rankedWar;
            }

            return TornAPIBase.GenericAPIError;
        }
    }

    async rankedwarreport(id: string): Promise<IRankedWarReport | ITornApiError> {
        const response = await axios.get<{ error?: ITornApiError, rankedwarreport: IRankedWarReport }>(this.buildUri({ route: 'torn', selection: 'rankedwarreports', id: id }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                const rw = response.data.rankedwarreport as IRankedWarReport;
                rw.factions = this.fixStringArray(rw.factions, 'id');
                for (let i = 0; i < rw.factions.length; i++) {
                    rw.factions[i].rewards.items = this.fixStringArray(rw.factions[i].rewards.items, 'id');
                }
                rw.members = this.fixStringArray(rw.members, 'id');
                return rw;
            }

            return TornAPIBase.GenericAPIError;
        }
    }

    async stats(): Promise<ITornStats | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'stats' });
    }

    async stocks(id?: string): Promise<IStock[] | IStockDetail | ITornApiError> {
        if (id) {
            const response = await axios.get<{ error?: ITornApiError, stocks: Record<string, IStockDetail> }>(this.buildUri({ route: 'torn', selection: 'stocks', id: id }));
            if (response instanceof Error) {
                return { code: 0, error: response.message };
            } else {
                if (response.data && response.data.error) {
                    return response.data.error;
                } else if (response.data) {
                    return response.data.stocks[id];
                }

                return TornAPIBase.GenericAPIError;
            }
        } else {
            return this.apiQueryToArray({ route: 'torn', selection: 'stocks' });
        }
    }

    async timestamp(): Promise<number | ITornApiError> {
        return this.apiQuery({ route: 'torn', selection: 'timestamp' });
    }

    async territory(id?: string): Promise<ITerritory[] | ITerritoryDetail | ITornApiError> {

        if (id) {
            const response = await axios.get<{ error?: ITornApiError, territory: Record<string, ITerritoryDetail> }>(this.buildUri({ route: 'torn', selection: 'territory', id: id }));
            if (response instanceof Error) {
                return { code: 0, error: response.message };
            } else {
                if (response.data && response.data.error) {
                    return response.data.error;
                } else if (response.data) {
                    const retValue = response.data.territory[id];
                    retValue.id = id;
                    return retValue;
                }

                return TornAPIBase.GenericAPIError;
            }
        } else {
            return this.apiQueryToArray({ route: 'torn', selection: 'territory' }, 'id');
        }
    }

    async territorywars(): Promise<ITerritoryWar[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'torn', selection: 'territorywars' }, 'id');
    }
}
