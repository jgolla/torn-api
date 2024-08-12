import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';

import { TornAPI } from '../lib';
import { IBasicUser, ICriminalRecord, IEvents, IHOF, IMissions, IPersonalStats, IUser, IUserProperty, IUserSkill } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('User API', () => {
    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('basic', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_basic'));

        const initialReturn = await torn.user.basic();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IBasicUser;
        expect(castedReturn?.level).to.equal(80);
        expect(castedReturn?.status.until).to.equal(0);
    });

    it('criminalrecord', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_criminalrecord'));

        const initialReturn = await torn.user.criminalrecord();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ICriminalRecord;
        expect(castedReturn?.counterfeiting).to.equal(7986);
        expect(castedReturn?.total).to.equal(52258);
    });

    it('events', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_events'));

        const initialReturn = await torn.user.events();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IEvents[];
        const event = castedReturn.find((x) => x.id === '4KlrivzsMp3kIHTuaRJm');
        expect(event?.timestamp).to.equal(1682945567);
    });

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
        const singleMission = missionStatus?.find((x) => x.title === 'Party Tricks');
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

    it('personalstats with timestamp, id & specified stats', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_personalstats_stats'));

        const initialReturn = await torn.user.personalstats('123', 123456, ['bazaarsales', 'mailssent', 'rifhits']);
        expect(TornAPI.isError(initialReturn)).to.be.false;
        expect(stub.args[0][0]).to.contain('https://api.torn.com/user/123');
        expect(stub.args[0][0]).to.contain('selections=personalstats');
        expect(stub.args[0][0]).to.contain('stat=bazaarsales%2Cmailssent%2Crifhits');
        expect(stub.args[0][0]).to.contain('timestamp=123456');

        const castedReturn = initialReturn as Partial<IPersonalStats>;

        expect(castedReturn.bazaarsales).to.equal(245024529);
        expect(castedReturn.mailssent).to.equal(9);
        expect(castedReturn.rifhits).to.equal(24590);
        expect(Object.entries(castedReturn).length).to.equal(3);
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
        expect(castedReturn.competition?.name).to.equal('Elimination');
        expect(castedReturn.job.job).to.equal('Director');
        expect(castedReturn.job.position).to.equal('Employee');
    });

    it('properties', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_properties'));
        const initialReturn = await torn.user.properties();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IUserProperty[];

        // spot check one
        const propery = castedReturn.find((x) => x.id === '2952723');
        expect(propery?.owner_id).to.equal(248772);
        expect(propery?.modifications.hot_tub).to.equal(1);
        expect(propery?.rented.user_id).to.equal(12345);
    });

    it('skills', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_skills'));
        const initialReturn = await torn.user.skills();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IUserSkill;

        expect(castedReturn.hunting).to.equal('7.81');
        expect(castedReturn.bootlegging).to.equal('100.00');
        expect(castedReturn.reviving).to.be.undefined;
    });
});
