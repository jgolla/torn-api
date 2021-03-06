import { TornAPIBase } from './TornAPIBase';
import { ITornApiError, IUser, IAmmo, IAttacks, IAttacksFull, IBars, IBasicUser, IBattleStats, ICooldowns, ICrimes, IDiscord, IEducation, IEvents, IGym, IHOF, IIcon, IInventory, IJobPoints, IJobs, ICompany, IMedals, IMerits, IMessage, IMoney, INetworth, INotifications, IPerks, IPersonalStats, IRefills, IRevives, IRevivesFull, IStocks, ITravel, IWorkStats, IUserProperty, IUserSkill } from './Interfaces';
import axios from 'axios';

export class User extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async user(id?: string): Promise<IUser | ITornApiError> {
        // todo: fix icons to IIcon[]
        return this.apiQuery({ route: 'user', selection: '', id: id });
    }

    async ammo(): Promise<IAmmo[] | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'ammo' });
    }

    async attacks(): Promise<IAttacks[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'attacks' });
    }

    async attacksfull(): Promise<IAttacksFull[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'attacksfull', jsonOverride: 'attacks' });
    }

    async bars(): Promise<IBars | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'bars' });
    }

    async basic(id?: string): Promise<IBasicUser | ITornApiError> {
        // todo: fix icons to IIcon[]
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
        return await this.apiQuery({ route: 'user', selection: 'crimes', jsonOverride: 'criminalrecord' });
    }

    async discord(): Promise<IDiscord | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'discord' });
    }

    async display(): Promise<unknown | ITornApiError> {
        throw new Error('Method not implemented.');
    }

    async education(): Promise<IEducation | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'education', jsonOverride: '' });
    }

    async events(): Promise<IEvents[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'events' });
    }

    async gym(): Promise<IGym | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'gym', jsonOverride: '' });
    }

    async hof(): Promise<IHOF | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'hof', jsonOverride: 'halloffame' });
    }

    async icons(id?: string): Promise<IIcon[] | ITornApiError> {
        const response = await axios.get(this.buildUri({ route: 'user', selection: 'icons', id: id }));
        if (response.data.error) {
            return response.data.error;
        } else {
            const icons: IIcon[] = [];
            const iconNames = Object.keys(response.data.icons);
            for (let i = 0; i < iconNames.length; i++) {
                const name = iconNames[i];
                const value = response.data.icons[name];
                icons.push({ name: name, value: value });
            }

            return icons;
        }
    }

    async inventory(): Promise<IInventory[] | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'inventory' });
    }

    async jobpoints(): Promise<IJobPoints | ITornApiError> {
        const response = await this.apiQuery<IInternalJobPoints>({ route: 'user', selection: 'jobpoints' });
        if ('error' in response) {
            return response;
        } else {
            const returnPoints: IJobPoints = {
                jobs: response.jobs,
                companies: Object.values(response.companies)
            }
            return returnPoints;
        }
    }

    async medals(): Promise<IMedals | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'medals', jsonOverride: '' });
    }

    async merits(): Promise<IMerits | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'merits' });
    }

    async messages(): Promise<IMessage[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'messages' });
    }

    async money(): Promise<IMoney | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'money', jsonOverride: '' });
    }

    async networth(): Promise<INetworth | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'networth' });
    }

    async notifications(): Promise<INotifications | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'notifications' });
    }

    async perks(): Promise<IPerks | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'perks', jsonOverride: '' });
    }

    async perpersonalstatsks(): Promise<IPersonalStats | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'personalstats' });
    }

    async profile(id?: string): Promise<IUser | ITornApiError> {
        return this.user(id);
    }

    async properties(): Promise<IUserProperty[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'properties' });
    }

    async refills(): Promise<IRefills | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'refills' });
    }

    async revives(): Promise<IRevives[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'revives' });
    }

    async revivesfull(): Promise<IRevivesFull[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'revives', jsonOverride: 'revivesfull' });
    }

    async skills(): Promise<IUserSkill | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'skills', jsonOverride: '' });
    }

    async stocks(): Promise<IStocks[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'stocks' });
    }

    async travel(): Promise<ITravel | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'travel' });
    }

    async weaponexp(): Promise<unknown | ITornApiError> {
        throw new Error('Method not implemented.');
    }

    async workstats(): Promise<IWorkStats | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'workstats', jsonOverride: '' });
    }
}

interface IInternalJobPoints {
    jobs: IJobs;
    companies: Map<string, ICompany>;
}
