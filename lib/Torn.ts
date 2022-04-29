import axios from 'axios';

import { IBank, ITornGym, IHonor, IItem, IMedal, IOrganisedCrime, IPawnshop, IRacket, IRaid, IStock, ITerritory, ITerritoryWar, ITornApiError, ITornCompany, ITornProperty, ITornStats, IFactionTree, IKeyValue, ICard, IStockDetail, ITornEducation, IPokerTable, IChainReport, IRankedWar, IRankedWarReport, ITerritoryDetail, Errorable } from './Interfaces';
import { TornAPIBase } from './TornAPIBase';

export class Torn extends TornAPIBase {

    constructor(apiKey: string) {
        super(apiKey);
    }

    async multi(endpoints: string[], id?: string): Promise<Errorable<Record<string, object>>> {
        return this.multiQuery('torn', endpoints, id);
    }

    async bank(): Promise<Errorable<IBank>> {
        return this.apiQuery({ route: 'torn', selection: 'bank' });
    }

    async cards(): Promise<Errorable<ICard[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'cards' }, 'id');
    }

    async chainreport(id: number): Promise<Errorable<IChainReport>> {
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

    async companies(): Promise<Errorable<ITornCompany[]>> {
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

    async education(): Promise<Errorable<ITornEducation[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'education' }, 'id');
    }

    async factiontree(): Promise<Errorable<IFactionTree[]>> {
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

    async gyms(): Promise<Errorable<ITornGym[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'gyms' }, 'id');
    }

    async honors(id?: string): Promise<Errorable<IHonor[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'honors', id: id }, 'id');
    }

    async items(): Promise<Errorable<IItem[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'items' }, 'id');
    }

    async logcategories(): Promise<Errorable<IKeyValue[]>> {
        return this.apiQueryToKeyValueArray({ route: 'torn', selection: 'logcategories' });
    }

    async logtypes(): Promise<Errorable<IKeyValue[]>> {
        return this.apiQueryToKeyValueArray({ route: 'torn', selection: 'logtypes' });
    }

    async medals(): Promise<Errorable<IMedal[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'medals' }, 'id');
    }

    async organisedcrimes(): Promise<Errorable<IOrganisedCrime[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'organisedcrimes' }, 'id');
    }

    async pawnshop(): Promise<Errorable<IPawnshop>> {
        return this.apiQuery({ route: 'torn', selection: 'pawnshop' });
    }

    async properties(): Promise<Errorable<ITornProperty[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'properties' }, 'id');
    }

    async pokertables(): Promise<Errorable<IPokerTable[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'pokertables' }, 'id');
    }

    async rackets(): Promise<Errorable<IRacket[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'rackets' }, 'id');
    }

    async raids(): Promise<Errorable<IRaid[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'raids' }, 'id');
    }

    async rankedwars(): Promise<Errorable<IRankedWar[]>> {
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

    async rankedwarreport(id: string): Promise<Errorable<IRankedWarReport>> {
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

    async stats(): Promise<Errorable<ITornStats>> {
        return this.apiQuery({ route: 'torn', selection: 'stats' });
    }

    async stocks(id?: string): Promise<Errorable<IStock[] | IStockDetail>> {
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

    async timestamp(): Promise<Errorable<number>> {
        return this.apiQuery({ route: 'torn', selection: 'timestamp' });
    }

    async territory(id?: string): Promise<Errorable<ITerritory[] | ITerritoryDetail>> {

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

    async territorywars(): Promise<Errorable<ITerritoryWar[]>> {
        return this.apiQueryToArray({ route: 'torn', selection: 'territorywars' }, 'id');
    }
}
