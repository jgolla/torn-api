import { TornAPIBase } from './TornAPIBase';
import { Errorable, KeyInfoResponse, KeyLogResponse, KeySelectionName } from './Interfaces';

export class ApiKey extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    /**
     * Gets information about the key.
     *
     * @param selection The type of information to retrieve about the key. Can be 'info' or 'log'.
     * @param limit The maximum number of log entries to retrieve. Default is 100, maximum is 100.
     * @param offset The number of log entries to skip before starting to collect the result set. Default is 0.
     * 
     * @returns The requested information about the key.
     */
    async key(selection: KeySelectionName, limit?: number, offset?: number): Promise<Errorable<KeyInfoResponse | KeyLogResponse>> {
        return this.apiQueryV2({ route: 'key', selection: selection, limit: limit, offset: offset });
    }

    /**
     * Gets the permission levels and type of the key.
     *
     * @returns The permission level of the key.
     */
    async info(): Promise<Errorable<KeyInfoResponse>> {
        return this.apiQueryV2({ route: 'key', selection: 'info' });
    }

    /**
     * Gets the log of actions performed with the key.
     * @param limit The maximum number of log entries to retrieve. Default is 100, maximum is 100.
     * @param offset The number of log entries to skip before starting to collect the result set. Default is 0.
     * 
     * @returns The log of actions performed with the key.  
     */
    async log(limit?: number, offset?: number): Promise<Errorable<KeyLogResponse>> {
        return this.apiQueryV2({ route: 'key', selection: 'log', limit: limit, offset: offset });
    }
}
