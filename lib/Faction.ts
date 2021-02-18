import axios from 'axios';

import { TornAPIBase } from './TornAPIBase';
import { IApplication, IArmor, IArmoryNews, IAttack, IAttackFull, IAttackNews, IChain, ICompleteChain, ICrime, ICrimeNews, ICrimeParticipant, ICurrency, IDonation, IDrug, IFaction, IFundsNews, IMainNews, IMedical, IMembershipNews, IRevives, IRevivesFull, IStats, ITornApiError, IUpgrade, IWeapon } from './Interfaces';

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
            factionReturn.members = this.fixStringMap(factionReturn.members);
            return factionReturn;
        }
    }

    async applications(): Promise<Map<string, IApplication> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'applications' });
    }

    async armor(): Promise<IArmor[] | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'armor' });
    }

    async armorynews(): Promise<Map<string, IArmoryNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'armorynews' });
    }

    async armorynewsfull(): Promise<Map<string, IArmoryNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'armorynewsfull', jsonOverride: 'armorynews' });
    }

    async attacknews(): Promise<Map<string, IAttackNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'attacknews' });
    }

    async attacknewsfull(): Promise<Map<string, IAttackNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'attacknewsfull', jsonOverride: 'attacknews' });
    }

    async attacks(from?: number, to?: number): Promise<Map<string, IAttack> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'attacks', from: from, to: to });
    }

    async attacksfull(from?: number, to?: number): Promise<Map<string, IAttackFull> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'attacksfull', jsonOverride: 'attacks', from: from, to: to });
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

    async chains(): Promise<Map<string, ICompleteChain> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'chains' });
    }

    async contributors(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async crimenews(): Promise<Map<string, ICrimeNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'crimenews' });
    }

    async crimenewsfull(): Promise<Map<string, ICrimeNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'crimenewsfull', jsonOverride: 'crimenews' });
    }

    async crimes(): Promise<Map<string, ICrime> | ITornApiError> {
        const crimeMap = await this.apiQueryToMap<ICrime>({ route: 'faction', selection: 'crimes' });

        if (!('error' in crimeMap)) {
            crimeMap.forEach(value => {
                const internalParticipants = value.participants;
                const participants: ICrimeParticipant[] = [];
                for (let i = 0; i < internalParticipants.length; i++) {
                    const participantMap = this.fixStringMap<IInternalCrimeParticipant>(internalParticipants[i]);
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

        return crimeMap;
    }

    async currency(): Promise<ICurrency | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'currency' });
    }

    async donations(): Promise<Map<string, IDonation> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'donations' });
    }

    async drugs(): Promise<IDrug[] | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'drugs' });
    }

    async fundsnews(): Promise<Map<string, IFundsNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'fundsnews' });
    }

    async fundsnewsfull(): Promise<Map<string, IFundsNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'fundsnewsfull', jsonOverride: 'fundsnews' });
    }

    async mainnews(): Promise<Map<string, IMainNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'mainnews' });
    }

    async mainnewsfull(): Promise<Map<string, IMainNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'mainnewsfull', jsonOverride: 'mainnews' });
    }

    async medical(): Promise<IMedical[] | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'medical' });
    }

    async membershipnews(): Promise<Map<string, IMembershipNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'membershipnews' });
    }

    async membershipnewsfull(): Promise<Map<string, IMembershipNews> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'membershipnewsfull', jsonOverride: 'membershipnews' });
    }

    async revives(): Promise<Map<string, IRevives> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'revives' });
    }

    async revivesfull(): Promise<Map<string, IRevivesFull> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'revivesfull', jsonOverride: 'revives' });
    }

    async stats(): Promise<IStats | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'stats' });
    }

    async temporary(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async territory(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async upgrades(): Promise<Map<string, IUpgrade> | ITornApiError> {
        return this.apiQueryToMap({ route: 'faction', selection: 'upgrades' });
    }

    async weapons(): Promise<IWeapon[] | ITornApiError> {
        return this.apiQuery({ route: 'faction', selection: 'weapons' });
    }
}

interface IInternalCrimeParticipant {
    id?: string;
    description?: string;
    details?: string;
    state?: string;
    color?: string;
    until?: number;
}
