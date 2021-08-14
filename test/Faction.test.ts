import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { IApplication, IFactionReport, IProperty, IReport } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Faction API', () => {

    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('applications', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_applications'));

        const initialReturn = await torn.faction.applications();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IApplication[];

        // spot check one
        const application = castedReturn.find(x => x.userID === 123456);
        expect(application?.name).to.equal('playername');
        expect(application?.stats.defence).to.equal(4);
    });

    it('reports', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_reports'));

        const initialReturn = await torn.faction.reports();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IFactionReport[];

        // spot check stats
        let report = castedReturn.find(x => x.id === '34');
        expect(report?.user_id).to.equal(3);
        expect(report?.target).to.equal(4);
        expect(report?.type).to.equal('stats');

        let stats = report?.report as IReport;
        expect(stats.manual_labor).to.equal(11271);
        expect(stats.speed).to.be.undefined;

        // spot check anonymousbounties
        report = castedReturn.find(x => x.id === '78');
        expect(report?.user_id).to.equal(7);
        expect(report?.target).to.equal(8);
        expect(report?.type).to.equal('anonymousbounties');

        const bounties = report?.report as string[];
        expect(bounties.length).to.equal(19);
        expect(bounties).to.include('Name4 [4] @ $1');
    });
});
