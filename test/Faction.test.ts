import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { IApplication, IArmor, IAttack, IAttackFull, IFaction, IFactionReport, INews, IReport } from '../lib/Interfaces';
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

    it('armor', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_armor'));

        const initialReturn = await torn.faction.armor();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IArmor[];

        // spot check one
        let armor = castedReturn.find(x => x.ID === 333);
        expect(armor?.name).to.equal('Liquid Body Armor');
        expect(armor?.loaned_to).to.equal(123456);

        // spot check one
        armor = castedReturn.find(x => x.ID === 50);
        expect(armor?.name).to.equal('Outer Tactical Vest');
        expect(armor?.loaned_to).to.equal('1,2');
    });

    it('armorynews', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_armorynews'));

        const initialReturn = await torn.faction.armorynews();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as INews[];

        // spot check one
        const armor = castedReturn.find(x => x.id === 'QnzHSbp0kEExZcGQIXix');
        expect(armor?.news).to.equal(`<a href = "http://www.torn.com/profiles.php?XID=2">2</a> used one of the faction's Xanax items.`);
        expect(armor?.timestamp).to.equal(1630776810);
    });

    it('attacknews', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_attacknews'));

        const initialReturn = await torn.faction.attacknews();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as INews[];

        // spot check one
        const news = castedReturn.find(x => x.id === 'ZDuZJGW0xroVpNdG817F');
        expect(news?.news).to.equal(`Someone mugged <a href = "http://www.torn.com/profiles.php?XID=3">3</a> [<a href = "http://www.torn.com/loader.php?sid=attackLog&ID=edad5c98bfa9ed01756">view</a>]`);
        expect(news?.timestamp).to.equal(1630777177);
    });

    it('attacks', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_attacks'));

        const initialReturn = await torn.faction.attacks();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IAttack[];

        // spot check one
        const attack = castedReturn.find(x => x.code === '0923d3d4ef3d7ac');
        expect(attack?.attacker_id).to.equal(``);
        expect(attack?.attacker_name).to.equal(`N/A`);
        expect(attack?.defender_id).to.equal(5);
        expect(attack?.modifiers.fair_fight).to.equal(1.37);
    });

    it('attacksfull', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_attacksfull'));

        const initialReturn = await torn.faction.attacksfull();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IAttackFull[];

        // spot check one
        const attack = castedReturn.find(x => x.code === 'c86335015dd94227ebcc');
        expect(attack?.attacker_id).to.equal(3);
        expect(attack?.defender_id).to.equal(4);
        expect(attack?.result).to.equal('Lost');
    });

    it('basic', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_basic'));

        const initialReturn = await torn.faction.basic();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IFaction;
        expect(castedReturn?.name).to.equal('Synthetic Kingdom Recluse');
        expect(castedReturn?.['co-leader']).to.equal(2390523);
        expect(castedReturn?.peace[0].faction_id).to.equal(8795);
        expect(castedReturn?.peace[0].until).to.equal(1630951833);
        expect(castedReturn?.territory_wars[0].territory).to.equal('JGB');
        expect(castedReturn?.raid_wars[0].raider_score).to.equal('3273.81');

        // spot check one member
        const member = castedReturn.members.find(x => x.id === '177489');
        expect(member?.name).to.equal('LanCel0t');
        expect(member?.last_action.status).to.equal('Offline');
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

        const stats = report?.report as IReport;
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
