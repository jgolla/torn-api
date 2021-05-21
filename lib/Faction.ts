import axios from 'axios';

import { TornAPIBase } from './TornAPIBase';
import { IApplication, IArmor, IArmoryNews, IAttack, IAttackFull, IAttackNews, IChain, ICompleteChain, ICrime, ICrimeNews, ICrimeParticipant, ICurrency, IDonation, IDrug, IFaction, IFactionPosition, IFundsNews, IMainNews, IMedical, IMembershipNews, IRevives, IRevivesFull, IStats, ITerritory, ITornApiError, IUpgrade, IWeapon } from './Interfaces';

export class Faction extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async faction(id?: string): Promise<IFaction | ITornApiError> {
        const response = await axios.get(this.buildUri({ route: 'faction', selection: '', id: id }));
        if (response.data.error) {
            return response.data.error;
        } else {
            const factionReturn: IFaction = response.data;
            factionReturn.members = this.fixStringArray(factionReturn.members, 'id');
            return factionReturn;
        }
    }

    async applications(): Promise<IApplication[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'applications' });
    }

    async armor(): Promise<IArmor[] | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'armor' });
    }

    async armorynews(from?: number, to?: number): Promise<IArmoryNews[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'armorynews', from: from, to: to }, 'id');
    }

    async attacknews(from?: number, to?: number): Promise<IAttackNews[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'attacknews', from: from, to: to }, 'id');
    }

    async attacks(from?: number, to?: number): Promise<IAttack[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'attacks', from: from, to: to });
    }

    async attacksfull(from?: number, to?: number): Promise<IAttackFull[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'attacksfull', jsonOverride: 'attacks', from: from, to: to });
    }

    async basic(id?: string): Promise<IFaction | ITornApiError> {
        return this.faction(id);
    }

    async boosters(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async cesium(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async chain(): Promise<IChain | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'chain' });
    }

    async chains(): Promise<ICompleteChain[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'chains' }, 'id');
    }

    async contributors(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async crimenews(from?: number, to?: number): Promise<ICrimeNews[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'crimenews', from: from, to: to }, 'id');
    }

    async crimes(): Promise<ICrime[] | ITornApiError> {
        const crimes = await this.apiQueryToArray<ICrime>({ route: 'faction', selection: 'crimes' }, 'id');

        if (!('error' in crimes)) {
            crimes.forEach(value => {
                const internalParticipants = value.participants;
                const participants: ICrimeParticipant[] = [];
                for (let i = 0; i < internalParticipants.length; i++) {
                    const participantMap = this.fixStringMap<Partial<ICrimeParticipant>>(internalParticipants[i]);
                    const id = participantMap.keys().next().value;
                    const value = participantMap.get(id);

                    const participant: ICrimeParticipant = {
                        id: id
                    };

                    if (value) {
                        participant.color = value.color;
                        participant.description = value.description;
                        participant.details = value.details;
                        participant.state = value.state;
                        participant.until = value.until;
                    }

                    participants.push(participant);
                }

                value.participants = participants;
            });
        }

        return crimes;
    }

    async currency(): Promise<ICurrency | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'currency' });
    }

    async donations(): Promise<IDonation[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'donations' }, 'id');
    }

    async drugs(): Promise<IDrug[] | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'drugs' });
    }

    async fundsnews(from?: number, to?: number): Promise<IFundsNews[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'fundsnews', from: from, to: to }, 'id');
    }

    async mainnews(from?: number, to?: number): Promise<IMainNews[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'mainnews', from: from, to: to }, 'id');
    }

    async medical(): Promise<IMedical[] | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'medical' });
    }

    async membershipnews(from?: number, to?: number): Promise<IMembershipNews[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'membershipnews', from: from, to: to }, 'id');
    }

    async positions(): Promise<IFactionPosition[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'positions' }, 'title');
    }

    async reports(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async revives(): Promise<IRevives[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'revives' }, 'id');
    }

    async revivesfull(): Promise<IRevivesFull[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'revivesfull', jsonOverride: 'revives' }, 'id');
    }

    async stats(): Promise<IStats | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'stats' });
    }

    async temporary(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async territory(): Promise<ITerritory[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'territory' }, 'id')
    }

    async upgrades(): Promise<IUpgrade[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'faction', selection: 'upgrades' }, 'id');
    }

    async weapons(): Promise<IWeapon[] | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'weapons' });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    private fixStringMap<V>(mapLike: any): Map<string, V> {
        const returnMap = new Map<string, V>();

        const ids = Object.keys(mapLike);
        for (let i = 0; i < ids.length; i++) {
            returnMap.set(ids[i], mapLike[ids[i]]);
        }

        return returnMap;
    }
}
