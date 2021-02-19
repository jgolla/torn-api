import { TornAPIBase } from './TornAPIBase';
import { ITornApiError, IUser, IAmmo, IAttacks, IAttacksFull, IBars, IBasicUser, IBattleStats, ICooldowns, IDiscord, ICrimes } from './Interfaces';

export class User extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async user(id?: string): Promise<IUser | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: '', id: id });
    }

    async ammo(): Promise<IAmmo[] | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'ammo' });
    }

    async attacks(): Promise<Map<string, IAttacks> | ITornApiError> {
        return this.apiQueryToMap({ route: 'user', selection: 'attacks' });
    }

    async attacksfull(): Promise<Map<string, IAttacksFull> | ITornApiError> {
        return this.apiQueryToMap({ route: 'user', selection: 'attacksfull', jsonOverride: 'attacks' });
    }

    async bars(): Promise<IBars | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'bars' });
    }

    async basic(id?: string): Promise<IBasicUser | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'basic', id: id });
    }

    async battlestats(): Promise<IBattleStats | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'battlestats' });
    }

    async bazaar(): Promise<unknown | ITornApiError> {
        throw new Error('Method not implemented.');
    }

    async cooldowns(): Promise<ICooldowns | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'cooldowns' });
    }

    async crimes(): Promise<ICrimes | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'crimes', jsonOverride: 'criminalrecord' });
    }

    async discord(): Promise<IDiscord | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'discord' });
    }

    async profile(id?: string): Promise<IUser | ITornApiError> {
        return this.user(id);
    }
}
