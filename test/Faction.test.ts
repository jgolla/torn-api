import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { IApplication, IArmor, IAttack, IAttackFull, IChain, IChainReport, ICompleteChain, ICrime, ICurrency, IDonation, IDrug, IFaction, IFactionPosition, IFactionReport, IMedical, INews, IReport, IRevives, IRevivesFull, IStats, IUpgrade, IWeapon } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Faction API', () => {

    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    // Remaining Tests: boosters, cesium, contributors, temporary

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

    it('basic with id', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_basic'));

        const initialReturn = await torn.faction.basic('1234');
        expect(TornAPI.isError(initialReturn)).to.be.false;
        expect(stub.args[0][0]).to.equal('https://api.torn.com/faction/1234?selections=&key=key');
    });

    it('chain', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_chain'));

        const initialReturn = await torn.faction.chain();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IChain;
        expect(castedReturn?.current).to.equal(0);
        expect(castedReturn?.max).to.equal(8795);
        expect(castedReturn?.start).to.equal(1630951833);
    });

    it('chainreport', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_chainreport'));

        const initialReturn = await torn.faction.chainreport();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IChainReport;
        expect(castedReturn?.chain).to.equal(250);
        expect(castedReturn?.leave).to.equal(244);
        expect(castedReturn?.respect).to.equal(1089.36);

        // spot check one member
        const member = castedReturn.members.find(x => x.userID === 2556388);
        expect(member?.respect).to.equal(36.33);
        expect(member?.attacks).to.equal(14);

        //spot check one bonus
        const bonus = castedReturn.bonuses.find(x => x.chain === 25);
        expect(bonus?.attacker).to.equal(2488990);
        expect(bonus?.respect).to.equal(20);
    });

    it('chains', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_chains'));

        const initialReturn = await torn.faction.chains();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ICompleteChain[];
        const chain = castedReturn.find(x => x.id === '9690493');

        expect(chain?.chain).to.equal(10);
        expect(chain?.respect).to.equal("20.6923");
        expect(chain?.start).to.equal(1582544410);
        expect(chain?.end).to.equal(1582544451);
    });

    it('crimenews', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_crimenews'));

        const initialReturn = await torn.faction.crimenews();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as INews[];

        // spot check one
        const news = castedReturn.find(x => x.id === 'e9zYGYSy4MWpb8VEARZP');
        expect(news?.news).to.equal(`The faction successfully initiated a planned robbery! [<a href = "http://www.torn.com/organisedcrimes.php?step=log&ID=555">Details</a>]`);
        expect(news?.timestamp).to.equal(1631334048);
    });

    it('crimes', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_crimes'));

        const initialReturn = await torn.faction.crimes();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ICrime[];

        // spot check one
        let crime = castedReturn.find(x => x.id === '9311663');
        expect(crime?.time_started).to.equal(1629533679);
        expect(crime?.time_left).to.equal(0);

        let member = crime?.participants.find(x => x.id = '1');
        expect(member?.state).to.be.undefined;
        expect(member?.details).to.be.undefined;

        crime = castedReturn.find(x => x.id === '9373151');
        expect(crime?.time_started).to.equal(1631157703);
        expect(crime?.time_left).to.equal(143180);

        member = crime?.participants.find(x => x.id = '4');
        expect(member?.state).to.equal('Okay');
        expect(member?.color).to.equal('green');

    });

    it('currency', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_currency'));

        const initialReturn = await torn.faction.currency();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ICurrency;
        expect(castedReturn?.faction_id).to.equal(44);
        expect(castedReturn?.points).to.equal(0);
        expect(castedReturn?.money).to.equal(654321);
    });

    it('donations', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_donations'));

        const initialReturn = await torn.faction.donations();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IDonation[];

        // spot check one
        let crime = castedReturn.find(x => x.id === '1');
        expect(crime?.name).to.equal('a');
        expect(crime?.money_balance).to.equal(310435970);
        expect(crime?.points_balance).to.equal(0);


        crime = castedReturn.find(x => x.id === '2');
        expect(crime?.name).to.equal('b');
        expect(crime?.money_balance).to.equal(0);
        expect(crime?.points_balance).to.equal(5000);
    });

    it('drugs', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_drugs'));

        const initialReturn = await torn.faction.drugs();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IDrug[];

        // spot check one
        const drug = castedReturn.find(x => x.ID === 206);
        expect(drug?.name).to.equal('Xanax');
        expect(drug?.quantity).to.equal(181);
        expect(drug?.type).to.equal('Drug');
    });

    it('fundnews', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_fundnews'));

        const initialReturn = await torn.faction.fundsnews();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as INews[];

        // spot check one
        const news = castedReturn.find(x => x.id === 'oRiMR8XSwic5tiNkCDWa');
        expect(news?.news).to.equal(`<a href = "http://www.torn.com/profiles.php?XID=2">2</a> deposited $50,000,000`);
        expect(news?.timestamp).to.equal(1631903946);
    });

    it('mainnews', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_mainnews'));

        const initialReturn = await torn.faction.mainnews();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as INews[];

        // spot check one
        const news = castedReturn.find(x => x.id === 'QUykOiGjMRQEWesSsmKx');
        expect(news?.news).to.equal(`<a class="t-green bold" href = "http://www.torn.com/factions.php?step=profile&ID=2">Fact2</a> has abandoned <a class="t-green bold" href = "http://www.torn.com/city.php#terrName=ABV">ABV</a>`);
        expect(news?.timestamp).to.equal(1631478567);
    });

    it('medical', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_medical'));

        const initialReturn = await torn.faction.medical();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IMedical[];

        // spot check one
        const medical = castedReturn.find(x => x.ID === 734);
        expect(medical?.name).to.equal('Blood Bag : B+');
        expect(medical?.quantity).to.equal(257);
        expect(medical?.type).to.equal('Medical');
    });

    it('membershipnews', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_membershipnews'));

        const initialReturn = await torn.faction.membershipnews();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as INews[];

        // spot check one
        const news = castedReturn.find(x => x.id === 'xJbsn5KaLCqbRZr4HcbE');
        expect(news?.news).to.equal(`<a href = http://www.torn.com/profiles.php?XID=1>1</a> changed <a href = http://www.torn.com/profiles.php?XID=2>2</a>'s position from Cadet to Newbie.`);
        expect(news?.timestamp).to.equal(1631825990);
    });

    it('positions', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_positions'));

        const initialReturn = await torn.faction.positions();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IFactionPosition[];

        // spot check one
        let position = castedReturn.find(x => x.title === 'Nothings');
        expect(position?.canAccessFactionApi).to.equal(0);
        expect(position?.canKickMembers).to.equal(0);

        // spot check one
        position = castedReturn.find(x => x.title === 'Cadet');
        expect(position?.default).to.equal(1);
        expect(position?.canKickMembers).to.equal(0);
        expect(position?.canUseMedicalItem).to.equal(1);
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

    it('revives', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_revives'));

        const initialReturn = await torn.faction.revives();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IRevives[];

        // spot check stats
        const revive = castedReturn.find(x => x.id === '4185525');
        expect(revive?.chance).to.equal(91.97);
        expect(revive?.reviver_id).to.equal(2224971);
        expect(revive?.reviver_factionname).to.equal('Unwavering Ruthless Loyal');
        expect(revive?.target_hospital_reason).to.equal('Mugged by someone');
        expect(revive?.target_last_action.status).to.equal('Idle');
    });

    it('revivesfull', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_revivesfull'));

        const initialReturn = await torn.faction.revivesfull();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IRevivesFull[];

        // spot check stats
        const revive = castedReturn.find(x => x.id === '3887765');
        expect(revive?.chance).to.equal(91.05);
        expect(revive?.reviver_id).to.equal(2224971);
        expect(revive?.target_hospital_reason).to.equal('Burned in an arson attempt');
        expect(revive?.target_last_action.status).to.equal('Online');
    });

    it('stats', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_stats'));

        const initialReturn = await torn.faction.stats();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IStats;

        // spot check stats        
        expect(castedReturn.alcoholused).to.equal(284624);
        expect(castedReturn.drugoverdoses).to.equal(824);
        expect(castedReturn.gymdexterity).to.equal(2886020);
        expect(castedReturn.medicalitemsused).to.equal(268624);
    });

    it('territorynews', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_territorynews'));

        const initialReturn = await torn.faction.territorynews();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as INews[];

        // spot check one
        const news = castedReturn.find(x => x.id === 'cwdXodZ93txRCl74YcIm');
        expect(news?.news).to.equal(`<a class="t-green bold" href = "http://www.torn.com/factions.php?step=profile&ID=1">NPO - Strength</a> gained 2 respect from their 2 territories.`);
        expect(news?.timestamp).to.equal(1630972889);
    });

    it('upgrades', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_upgrades'));

        const initialReturn = await torn.faction.upgrades();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IUpgrade[];

        // spot check stats
        let revive = castedReturn.find(x => x.id === '37');
        expect(revive?.branch).to.equal('Steadfast');
        expect(revive?.name).to.equal('Speed training IX');
        expect(revive?.unlocked).to.equal('2021-09-07 05:08:54');
        expect(revive?.unsets_completed).to.equal(1632196872);

        revive = castedReturn.find(x => x.id === '1');
        expect(revive?.branch).to.equal('Core');
        expect(revive?.name).to.equal('Weapon armory');
        expect(revive?.unlocked).to.equal('2020-05-31 12:12:43');
        expect(revive?.unsets_completed).to.be.undefined;
    });

    it('weapons', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('faction_weapons'));

        const initialReturn = await torn.faction.weapons();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IWeapon[];

        // spot check one
        let weapon = castedReturn.find(x => x.ID === 26);
        expect(weapon?.name).to.equal('AK-47');
        expect(weapon?.loaned_to).to.be.null;

        // spot check one
        weapon = castedReturn.find(x => x.ID === 399);
        expect(weapon?.name).to.equal('ArmaLite M-15A4');
        expect(weapon?.loaned_to).to.equal('1,2,3,4');
    });
});
