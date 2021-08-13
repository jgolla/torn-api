import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { IBank, ICard, IFactionTree, IHonor, ITornCompany, ITornEducation, ITornGym } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Torn API', () => {

    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('bank', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('bank'));

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
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('cards'));

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
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('companies'));

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
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('education'));

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
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('factiontree'));

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
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('gyms'));

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
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('honors'));

        const initialReturn = await torn.torn.honors();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IHonor[];

        // spot check one
        const honor = castedReturn.find(x => x.id === '28');
        expect(honor?.name).to.equal('Machinist');
        expect(honor?.description).to.equal('Achieve 100 finishing hits with mechanical weapons');
    });
});
