import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';

import { TornAPI } from '../lib';
import { TestHelper } from './utils/TestUtils';
import { Race, RaceCar, RaceCarUpgrade, RaceRecord, RaceTrack, RacingSelectionName } from '../lib/Interfaces';

describe('Racing API', () => {
    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('races', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('racing_races'));

        const initialReturn = await torn.racing.races();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as Race[];

        // spot check one
        const race = castedReturn.find((x) => x.id === 12402563);
        expect(race?.title).to.equal('Quick Speedway');
        expect(race?.schedule?.join_from).to.equal(1723549856);
    });

    it('records', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('racing_records'));

        const initialReturn = await torn.racing.records(21, 'A');
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as RaceRecord[];

        // spot check one
        const race = castedReturn.find((x) => x.driver_id === 773244);
        expect(race?.car_item_name).to.equal('Stormatti Casteon');
    });

    it('race', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('racing_race'));

        const initialReturn = await torn.racing.race(12402582);
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as Race;

        // spot check one
        expect(castedReturn?.title).to.equal('XP Race');
        expect(castedReturn?.schedule?.join_from).to.equal(1723550034);
    });

    it('cars', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('racing_cars'));

        const initialReturn = await torn.racing.cars();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as RaceCar[];

        // spot check one
        const racecar = castedReturn.find((x) => x.car_item_id === 78);
        expect(racecar?.car_item_name).to.equal('Edomondo NSX');
        expect(racecar?.handling).to.equal(55);
    });

    it('tracks', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('racing_tracks'));

        const initialReturn = await torn.racing.tracks();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as RaceTrack[];

        // spot check one
        const racetrack = castedReturn.find((x) => x.id === 7);
        expect(racetrack?.title).to.equal('Withdrawal');
    });

    it('carupgrades', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('racing_carupgrades'));

        const initialReturn = await torn.racing.carupgrades();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as RaceCarUpgrade[];

        // spot check one
        const upgrade = castedReturn.find((x) => x.id === 4);
        expect(upgrade?.name).to.equal('Uprated Springs (Soft)');
    });

    it('lookup', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('racing_lookup'));

        const initialReturn = await torn.racing.lookup();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as RacingSelectionName[];

        // spot check one
        expect(castedReturn.length).to.equal(8);
        expect(castedReturn[1]).to.equal('carupgrades');
    });
});
