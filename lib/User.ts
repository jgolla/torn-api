import { TornAPIBase } from './TornAPIBase';
import { ITornApiError, IUser, IAmmo, IAttack, IBars, IBasicUser, IBattleStats, ICooldowns, ICrimes, IDiscord, IEducation, IEvents, IGym, IHOF, IIcon, IInventory, IJobPoints, IJobs, IUserCompany, IMedals, IMerits, IMessage, IMoney, INetworth, INotifications, IPerks, IPersonalStats, IRefills, IRevives, IRevivesFull, IUserStock, ITravel, IWorkStats, IUserProperty, IUserSkill, IAttackFull, ILog, IUserStockTransaction, IMissions, IMissionStatus, Errorable } from './Interfaces';
import axios from 'axios';

export class User extends TornAPIBase {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async multi(endpoints: string[], id?: string): Promise<Errorable<Record<string, object>>> {
        return this.multiQuery('user', endpoints, id);
    }

    async user(id?: string): Promise<Errorable<IUser>> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await axios.get<any>(this.buildUri({ route: 'user', selection: '', id: id }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
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

            return TornAPIBase.GenericAPIError;
        }
    }

    async ammo(): Promise<Errorable<IAmmo[]>> {
        return this.apiQuery({ route: 'user', selection: 'ammo' });
    }

    async attacks(): Promise<Errorable<IAttack[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'attacks' });
    }

    async attacksfull(): Promise<Errorable<IAttackFull[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'attacksfull', jsonOverride: 'attacks' });
    }

    async bars(): Promise<Errorable<IBars>> {
        return this.apiQuery({ route: 'user', selection: 'bars', jsonOverride: '' });
    }

    async basic(id?: string): Promise<Errorable<IBasicUser>> {
        return this.apiQuery({ route: 'user', selection: 'basic', id: id });
    }

    async battlestats(): Promise<Errorable<IBattleStats>> {
        return this.apiQuery({ route: 'user', selection: 'battlestats', jsonOverride: '' });
    }

    async bazaar(): Promise<unknown> {
        throw new Error('Method not implemented.');
    }

    async cooldowns(): Promise<Errorable<ICooldowns>> {
        return this.apiQuery({ route: 'user', selection: 'cooldowns' });
    }

    async crimes(id?: string): Promise<Errorable<ICrimes>> {
        return await this.apiQuery({ route: 'user', selection: 'crimes', jsonOverride: 'criminalrecord', id: id });
    }

    async discord(): Promise<Errorable<IDiscord>> {
        return this.apiQuery({ route: 'user', selection: 'discord' });
    }

    async display(): Promise<unknown> {
        throw new Error('Method not implemented.');
    }

    async education(): Promise<Errorable<IEducation>> {
        return this.apiQuery({ route: 'user', selection: 'education', jsonOverride: '' });
    }

    async events(limit?: number): Promise<Errorable<IEvents[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'events', limit: limit });
    }

    async gym(): Promise<Errorable<IGym>> {
        return this.apiQuery({ route: 'user', selection: 'gym', jsonOverride: 'active_gym' });
    }

    async hof(): Promise<Errorable<IHOF>> {
        return this.apiQuery({ route: 'user', selection: 'hof', jsonOverride: 'halloffame' });
    }

    async icons(id?: string): Promise<Errorable<IIcon[]>> {
        const response = await axios.get<{ error?: ITornApiError, icons: Record<string, string> }>(this.buildUri({ route: 'user', selection: 'icons', id: id }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                const icons: IIcon[] = [];
                const iconNames = Object.keys(response.data.icons);
                for (let i = 0; i < iconNames.length; i++) {
                    const name = iconNames[i];
                    const value = response.data.icons[name];
                    icons.push({ name: name, value: value });
                }

                return icons;
            }

            return TornAPIBase.GenericAPIError;
        }
    }

    async inventory(): Promise<Errorable<IInventory[]>> {
        return this.apiQuery({ route: 'user', selection: 'inventory' });
    }

    async jobpoints(): Promise<Errorable<IJobPoints>> {
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

    async log(): Promise<Errorable<ILog[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'log' }, 'id');
    }

    async medals(id?: string): Promise<Errorable<IMedals>> {
        return this.apiQuery({ route: 'user', selection: 'medals', jsonOverride: '', id: id });
    }

    async merits(): Promise<Errorable<IMerits>> {
        return this.apiQuery({ route: 'user', selection: 'merits' });
    }

    async messages(limit?: number): Promise<Errorable<IMessage[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'messages', limit: limit });
    }

    async missions(): Promise<Errorable<IMissions[]>> {
        const response = await axios.get<{ error?: ITornApiError, missions: Record<string, IMissionStatus[]> }>(this.buildUri({ route: 'user', selection: 'missions' }));
        if (response instanceof Error) {
            return { code: 0, error: response.message };
        } else {
            if (response.data && response.data.error) {
                return response.data.error;
            } else if (response.data) {
                const missionReturn: IMissions[] = [];
                const keys = Object.keys(response.data.missions);
                for (let i = 0; i < keys.length; i++) {
                    missionReturn.push({ id: keys[i], missions: response.data.missions[keys[i]] });
                }

                return missionReturn;
            }

            return TornAPIBase.GenericAPIError;
        }
    }

    async money(): Promise<Errorable<IMoney>> {
        return this.apiQuery({ route: 'user', selection: 'money', jsonOverride: '' });
    }

    async networth(): Promise<Errorable<INetworth>> {
        return this.apiQuery({ route: 'user', selection: 'networth' });
    }

    async newevents(): Promise<Errorable<IEvents[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'newevents', jsonOverride: 'events' });
    }

    async newmessages(): Promise<Errorable<IMessage[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'newmessages', jsonOverride: 'messages' });
    }

    async notifications(): Promise<Errorable<INotifications>> {
        return this.apiQuery({ route: 'user', selection: 'notifications' });
    }

    async perks(): Promise<Errorable<IPerks>> {
        return this.apiQuery({ route: 'user', selection: 'perks', jsonOverride: '' });
    }

    async personalstats(id?: string, timestamp?: number): Promise<Errorable<IPersonalStats>> {
        return this.apiQuery({ route: 'user', selection: 'personalstats', timestamp: timestamp, id: id });
    }

    async profile(id?: string): Promise<Errorable<IUser>> {
        return this.user(id);
    }

    async properties(): Promise<Errorable<IUserProperty[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'properties' }, 'id');
    }

    async refills(): Promise<Errorable<IRefills>> {
        return this.apiQuery({ route: 'user', selection: 'refills' });
    }

    async reports(): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    async revives(): Promise<Errorable<IRevives[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'revives' });
    }

    async revivesfull(): Promise<Errorable<IRevivesFull[]>> {
        return this.apiQueryToArray({ route: 'user', selection: 'revives', jsonOverride: 'revivesfull' });
    }

    async skills(): Promise<Errorable<IUserSkill>> {
        return this.apiQuery({ route: 'user', selection: 'skills', jsonOverride: '' });
    }

    async stocks(): Promise<Errorable<IUserStock[]>> {
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

    async travel(): Promise<Errorable<ITravel>> {
        return this.apiQuery({ route: 'user', selection: 'travel' });
    }

    async weaponexp(): Promise<unknown> {
        throw new Error('Method not implemented.');
    }

    async workstats(): Promise<Errorable<IWorkStats>> {
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
