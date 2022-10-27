import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';

import { TornAPI } from '../lib';
import { IHOF, IMissions, IPersonalStats, IUser, IUserProperty } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('User API', () => {

    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('hof', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_hof'));

        const initialReturn = await torn.user.hof();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IHOF;
        expect(castedReturn.battlestats.value).to.equal(6032709);
        expect(castedReturn.battlestats.rank).to.equal(140);

        expect(castedReturn.traveltime.value).to.equal(272836);
        expect(castedReturn.traveltime.rank).to.equal(45);
    });

    it('missions', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_missions'));

        const initialReturn = await torn.user.missions();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IMissions[];
        expect(castedReturn.length).to.equal(1);
        expect(castedReturn[0].id).to.equal('Duke');

        const missionStatus = castedReturn[0].missions;
        expect(missionStatus).not.to.be.undefined;

        expect(missionStatus?.length).to.equal(9);
        const singleMission = missionStatus?.find(x => x.title === 'Party Tricks');
        expect(singleMission?.status).to.equal('failed');
    });

    it('personalstats', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_personalstats'));

        const initialReturn = await torn.user.personalstats();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IPersonalStats;
        expect(castedReturn.bestkillstreak).to.equal(999);
        expect(castedReturn.totalbountyreward).to.equal(245245450245245);
    });

    it('personalstats with timestamp & id', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_personalstats'));
        await torn.user.personalstats('123', 123456);
        expect(stub.args[0][0]).to.equal('https://api.torn.com/user/123?selections=personalstats&key=key&timestamp=123456');
    });

    it('profile', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_profile'));
        const initialReturn = await torn.user.profile();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IUser;
        expect(castedReturn.competition?.name).to.equal("Elimination");
    });

    it('properties', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_properties'));
        const initialReturn = await torn.user.properties();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IUserProperty[];

        // spot check one
        const propery = castedReturn.find(x => x.id === '2952723');
        expect(propery?.owner_id).to.equal(248772);
        expect(propery?.modifications.hot_tub).to.equal(1);
        expect(propery?.rented.user_id).to.equal(12345);
    });
});
