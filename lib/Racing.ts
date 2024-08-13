import { TornAPIBase } from './TornAPIBase';
import { Errorable, Race, RaceCar, RaceCarUpgrade, RaceCategory, RaceClassEnum, RaceRecord, RaceTrack, Sort } from './Interfaces';

export class Racing extends TornAPIBase {
    constructor(apiKey: string, comment: string) {
        super(apiKey, comment);
    }

    /**
     * Return the stat details about racing cars.
     * @returns RaceCar[]
     */
    async cars(): Promise<Errorable<RaceCar[]>> {
        return this.apiQueryV2({ route: 'racing', selection: 'cars' });
    }

    /**
     * Return the details about all possible car upgrades.
     * @returns RaceCarUpgrade[]
     */
    async carupgrades(): Promise<Errorable<RaceCarUpgrade[]>> {
        return this.apiQueryV2({ route: 'racing', selection: 'carupgrades' });
    }

    /**
     * Returns a list of races, ordered by race start timestamp
     * @param limit
     * @param from Timestamp after when started races are returned (scheduled.start)
     * @param to Timestamp until when started races are returned (schedule.start)
     * @param sort Sorted by schedule.start field, ASC | DESC
     * @param cat Category of races returned, official | custom
     * @returns Race[]
     */
    async races(limit?: number, from?: number, to?: number, sort?: Sort, cat?: RaceCategory): Promise<Errorable<Race[]>> {
        return this.apiQueryV2({ route: 'racing', selection: 'races', limit: limit, to: to, from: from, sort: sort, cat: cat });
    }

    /**
     * Return the details of a race.
     * @param id Race id
     * @returns Race
     */
    async race(id: number): Promise<Errorable<Race>> {
        return this.apiQueryV2({ route: 'racing', selection: 'race', id: id });
    }

    /**
     * Returns a list of 10 best lap records for the chosen track and car class. Results are cached globally 1 hour
     * @param id Track id
     * @param cat Car class, A | B | C | D | E
     * @returns RaceRecord[]
     */
    async records(id: number, cat: RaceClassEnum): Promise<Errorable<RaceRecord[]>> {
        return this.apiQueryV2({ route: 'racing', selection: 'records', id: id, cat: cat });
    }

    /**
     * Return the details about racing tracks.
     * @returns RaceTrack[]
     */
    async tracks(): Promise<Errorable<RaceTrack[]>> {
        return this.apiQueryV2({ route: 'racing', selection: 'tracks' });
    }
}
