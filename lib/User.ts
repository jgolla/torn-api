import axios from 'axios';

import { ITornApiError, IUser, IAmmo } from './Interfaces';

export class User {
    constructor(private apiKey: string) {
    }

    async user(id?: string): Promise<IUser | ITornApiError> {
        const response = await axios.get(`https://api.torn.com/user/${id}?selections=&key=${this.apiKey}`);
        if (response.data.error) {
            return response.data.error;
        } else {
            return response.data;
        }
    }

    async profile(id?: string): Promise<IUser | ITornApiError> {
        return this.user(id);
    }

    async ammo(): Promise<IAmmo[] | ITornApiError> {
        const response = await axios.get(`https://api.torn.com/user/?selections=ammo&key=${this.apiKey}`);
        if (response.data.error) {
            return response.data.error;
        } else {
            return response.data.ammo;
        }
    }
}

