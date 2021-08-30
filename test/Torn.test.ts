import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { IBank, ICard, IFactionTree, IHonor, IItem, IKeyValue, IMedal, IOrganisedCrime, IPawnshop, IRacket, IRaid, IStock, IStockDetail, ITerritory, ITerritoryWar, ITornCompany, ITornEducation, ITornGym, ITornProperty, ITornStats } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Torn API', () => {

    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('bank', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_bank'));

        const initialReturn = await torn.torn.bank();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IBank;
        expect(castedReturn['1w']).to.equal(39.45);
        expect(castedReturn['2w']).to.equal(42.93);
        expect(castedReturn['1m']).to.equal(49.37);
        expect(castedReturn['2m']).to.equal(47.38);
        expect(castedReturn['3m']).to.equal(54.87);
    });

    it('cards', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_cards'));

        const initialReturn = await torn.torn.cards();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ICard[];

        // spot check one
        const card = castedReturn.find(x => x.id === '23');
        expect(card?.name).to.equal('Seven of Clubs');
        expect(card?.value).to.equal(7);
        expect(card?.short).to.equal(7);
        expect(card?.color).to.equal('Black');
        expect(card?.suit).to.equal('Clubs');
    });

    it('companies', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_companies'));

        const initialReturn = await torn.torn.companies();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ITornCompany[];

        // spot check one
        const company = castedReturn.find(x => x.id === '23');
        expect(company?.name).to.equal('Music Store');
        expect(company?.positions.length).to.equal(7);

        //spot check one
        const postition = company?.positions.find(x => x.name === 'Musician');
        expect(postition?.description).to.equal('This position can give expert advice on different instruments to secure sales.');

        //spot check one
        const stock = company?.stock.find(x => x.name === 'Violin');
        expect(stock?.cost).to.equal(389);

        //spot check one
        const special = company?.specials.find(x => x.name === 'High-fidelity');
        expect(special?.effect).to.equal('Reduced enemy stealth');
    });

    it('education', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_education'));

        const initialReturn = await torn.torn.education();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ITornEducation[];

        // spot check one
        const education = castedReturn.find(x => x.id === '28');
        expect(education?.name).to.equal('Probability');

        // spot check one
        expect(education?.results?.perk).to.have.members(['Gain 1% productivity for your company']);
        expect(education?.prerequisites).to.have.members([22]);
    });

    it('factiontree', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_factiontree'));

        const initialReturn = await torn.torn.factiontree();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IFactionTree[];

        // spot check one
        const factiontree = castedReturn.find(x => x.id === '23');
        expect(factiontree?.branch.length).to.equal(10);

        // spot check one
        const branch = factiontree?.branch.filter(x => x.id === '6')[0];
        expect(branch?.branch).to.equal('Voracity');
        expect(branch?.name).to.equal('Candy effect VI');
        expect(branch?.challenge).to.equal('Use 2,000 bags of candy');
    });

    it('gyms', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_gyms'));

        const initialReturn = await torn.torn.gyms();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ITornGym[];

        // spot check one
        const gym = castedReturn.find(x => x.id === '28');
        expect(gym?.name).to.equal('Mr. Isoyamas');
        expect(gym?.note).to.equal('Requirements must be maintained to preserve access to this gym');
        expect(gym?.defense).to.equal(80);
    });

    it('honors', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_honors'));

        const initialReturn = await torn.torn.honors();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IHonor[];

        // spot check one
        const honor = castedReturn.find(x => x.id === '28');
        expect(honor?.name).to.equal('Machinist');
        expect(honor?.description).to.equal('Achieve 100 finishing hits with mechanical weapons');
    });

    it('items', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_items'));

        const initialReturn = await torn.torn.items();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IItem[];

        // spot check one
        const item = castedReturn.find(x => x.id === '61');
        expect(item?.name).to.equal('Personal Computer');
        expect(item?.description).to.equal('A high-tech personal computer. Can be used to program viruses.');
        expect(item?.weapon_type).to.be.null;
    });

    it('logcategories', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_logcategories'));

        const initialReturn = await torn.torn.logcategories();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IKeyValue[];

        // spot check one
        const item = castedReturn.find(x => x.key === '61');
        expect(item?.value).to.equal('Drugs');
    });

    it('logtypes', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_logtypes'));

        const initialReturn = await torn.torn.logtypes();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IKeyValue[];

        // spot check one
        const item = castedReturn.find(x => x.key === '361');
        expect(item?.value).to.equal('Personal details real name change');
    });

    it('medals', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_medals'));

        const initialReturn = await torn.torn.medals();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IMedal[];

        // spot check one
        const medal = castedReturn.find(x => x.id === '61');
        expect(medal?.name).to.equal('Ub3r Hacker');
        expect(medal?.description).to.equal('Commit 4,000 Computer crimes');
    });

    it('organisedcrimes', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_organisedcrimes'));

        const initialReturn = await torn.torn.organisedcrimes();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IOrganisedCrime[];

        // spot check one
        const medal = castedReturn.find(x => x.id === '6');
        expect(medal?.name).to.equal('Taking over a cruise liner');
        expect(medal?.members).to.equal(15);
    });

    it('pawnshop', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_pawnshop'));

        const initialReturn = await torn.torn.pawnshop();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IPawnshop;
        expect(castedReturn.points_value).to.equal(45000);
        expect(castedReturn.donatorpack_value).to.equal(22600000);
    });

    it('properties', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_properties'));

        const initialReturn = await torn.torn.properties();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ITornProperty[];

        // spot check one
        const property = castedReturn.find(x => x.id === '16');
        expect(property?.name).to.equal('Drakkar Sea Fort');
        expect(property?.staff_available).to.have.members([
            "Maid",
            "Butler",
            "Guard",
            "Doctor"
        ]);
    });

    it('rackets', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_rackets'));

        const initialReturn = await torn.torn.rackets();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IRacket[];

        // spot check one
        const racket = castedReturn.find(x => x.id === 'QZG');
        expect(racket?.name).to.equal('Truck Stop I');
        expect(racket?.reward).to.equal('10x Can of Red Cow daily');
    });

    it('raids', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_raids'));

        const initialReturn = await torn.torn.raids();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IRaid[];

        // spot check one
        const raid = castedReturn.find(x => x.id === '2727');
        expect(raid?.assaulting_faction).to.equal(46270);
        expect(raid?.defending_faction).to.equal(44416);
    });

    it('stats', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_stats'));

        const initialReturn = await torn.torn.stats();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ITornStats;
        expect(castedReturn.total_items_dumpfinds).to.equal(47461648);
        expect(castedReturn.total_jail_busted).to.equal(29748557);
    });

    it('stocks', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_stocks'));

        const initialReturn = await torn.torn.stocks();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IStock[];

        // spot check one
        const stock = castedReturn.find(x => x.stock_id === 16);
        expect(stock?.name).to.equal('Symbiotic Ltd.');
        expect(stock?.benefit.description).to.equal('1x Drug Pack');
    });

    it('stocks by id', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_stocks_by_id'));

        const initialReturn = await torn.torn.stocks('16');
        expect(TornAPI.isError(initialReturn)).to.be.false;
        expect(stub.args[0][0]).to.include('/16?');

        const castedReturn = initialReturn as IStockDetail;

        // spot check one
        expect(castedReturn.name).to.equal('Symbiotic Ltd.');
        expect(castedReturn.benefit.description).to.equal('1x Drug Pack');
        expect(castedReturn.last_week.change).to.equal(-3.8);

        // spot check one
        const history = castedReturn.history.find(x => x.timestamp === 1628943960);
        expect(history?.change).to.equal(-0.07);
        expect(history?.price).to.equal(695.19);
    });

    it('territory', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_territory'));

        const initialReturn = await torn.torn.territory();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ITerritory[];

        // spot check one
        const territory = castedReturn.find(x => x.id === 'HYB');
        expect(territory?.sector).to.equal(5);
        expect(territory?.coordinate_x).to.equal('855.33');
    });

    it('territorywars', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_territorywars'));

        const initialReturn = await torn.torn.territorywars();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ITerritoryWar[];

        // spot check one
        const territory = castedReturn.find(x => x.id === 'AMF');
        expect(territory?.assaulting_faction).to.equal(11559);
        expect(territory?.defending_faction).to.equal(15256);
    });

    it('timestamp', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('torn_timestamp'));

        const initialReturn = await torn.torn.timestamp();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as number;
        expect(castedReturn).to.equal(1628945289);
    });
});
