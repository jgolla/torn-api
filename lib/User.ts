import { TornAPIBase } from './TornAPIBase';
import { ITornApiError, IUser, IAmmo, IAttack, IBars, IBasicUser, IBattleStats, ICooldowns, ICrimes, IDiscord, IEducation, IEvents, IGym, IHOF, IIcon, IInventory, IJobPoints, IJobs, IUserCompany, IMedals, IMerits, IMessage, IMoney, INetworth, INotifications, IPerks, IPersonalStats, IRefills, IRevives, IRevivesFull, IUserStock, ITravel, IWorkStats, IUserProperty, IUserSkill, IAttackFull, ILog, IUserStockTransaction, IMissions, IMissionStatus } from './Interfaces';
import axios from 'axios';

export class User extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async user(id?: string): Promise<IUser | ITornApiError> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await axios.get<any>(this.buildUri({ route: 'user', selection: '', id: id }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data.error) {
                return response.data.error;
            } else {
                const user = response.data;

                const icons: IIcon[] = [];
                const iconNames = Object.keys(user.basicicons);
                for (let i = 0; i < iconNames.length; i++) {
                    const name = iconNames[i];
                    const value = user.basicicons[name];
                    icons.push({ name: name, value: value });
                }

                user.basicicons = icons;
                return user;
            }
        }
    }

    async ammo(): Promise<IAmmo[] | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'ammo' });
    }

    async attacks(): Promise<IAttack[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'attacks' });
    }

    async attacksfull(): Promise<IAttackFull[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'attacksfull', jsonOverride: 'attacks' });
    }

    async bars(): Promise<IBars | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'bars', jsonOverride: '' });
    }

    async basic(id?: string): Promise<IBasicUser | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'basic', id: id });
    }

    async battlestats(): Promise<IBattleStats | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'battlestats', jsonOverride: '' });
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

    async events(limit?: number): Promise<IEvents[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'events', limit: limit });
    }

    async gym(): Promise<IGym | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'gym', jsonOverride: 'active_gym' });
    }

    async hof(): Promise<IHOF | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'hof', jsonOverride: 'halloffame' });
    }

    async icons(id?: string): Promise<IIcon[] | ITornApiError> {
        const response = await axios.get<{ error?: ITornApiError, icons: Record<string, string> }>(this.buildUri({ route: 'user', selection: 'icons', id: id }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
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
            };
            return returnPoints;
        }
    }

    async log(): Promise<ILog[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'log' }, 'id');
    }

    async medals(id?: string): Promise<IMedals | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'medals', jsonOverride: '', id: id });
    }

    async merits(): Promise<IMerits | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'merits' });
    }

    async messages(limit?: number): Promise<IMessage[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'messages', limit: limit });
    }

    async missions(): Promise<IMissions[] | ITornApiError> {
        const response = await axios.get<{ error?: ITornApiError, missions: Record<string, IMissionStatus[]> }>(this.buildUri({ route: 'user', selection: 'missions' }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data.error) {
                return response.data.error;
            } else {
                const missionReturn: IMissions[] = [];
                const keys = Object.keys(response.data.missions);
                for (let i = 0; i < keys.length; i++) {
                    missionReturn.push({ id: keys[i], missions: response.data.missions[keys[i]] });
                }

                return missionReturn;
            }
        }
    }

    async money(): Promise<IMoney | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'money', jsonOverride: '' });
    }

    async networth(): Promise<INetworth | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'networth' });
    }

    async newevents(): Promise<IEvents[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'newevents', jsonOverride: 'events' });
    }

    async newmessages(): Promise<IMessage[] | ITornApiError> {
        return this.apiQueryToArray({ route: 'user', selection: 'newmessages', jsonOverride: 'messages' });
    }

    async notifications(): Promise<INotifications | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'notifications' });
    }

    async perks(): Promise<IPerks | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'perks', jsonOverride: '' });
    }

    async personalstats(timestamp?: number): Promise<IPersonalStats | ITornApiError> {
        return this.apiQuery({ route: 'user', selection: 'personalstats', timestamp: timestamp });
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

    async reports(): Promise<undefined> {
        throw new Error('Method not implemented.');
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

    async stocks(): Promise<IUserStock[] | ITornApiError> {
        const response = await this.apiQueryToArray<IInternalUserStock>({ route: 'user', selection: 'stocks' });
        if ('error' in response) {
            return response;
        } else {
            const retArray: IUserStock[] = [];
            for (let i = 0; i < response.length; i++) {
                const tempStock = response[i];
                retArray.push({
                    stock_id: tempStock.stock_id,
                    total_shares: tempStock.total_shares,
                    dividend: tempStock.dividend,
                    transactions: this.fixStringArray(tempStock.transactions, 'id')
                });
            }

            return retArray;
        }
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
    companies: Map<string, IUserCompany>;
}

interface IInternalUserStock {
    stock_id: number;
    total_shares: number;
    dividend?: {
        ready: number;
        increment: number;
        progress: number;
        frequency: number;
    };
    transactions: Map<string, IUserStockTransaction>;
}
