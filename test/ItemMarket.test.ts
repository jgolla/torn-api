import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { IMarketItem, IPointsMarket } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('ItemMarket API', () => {

    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('bazaar', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('itemmarket_bazaar'));

        const initialReturn = await torn.itemmarket.bazaar('52');
        expect(TornAPI.isError(initialReturn)).to.be.false;
        expect(stub.args[0][0]).to.contain('/52?');

        const castedReturn = initialReturn as IMarketItem[];

        // spot check one
        const item = castedReturn.find(x => x.ID === 46596312);
        expect(item?.cost).to.equal(950);
        expect(item?.quantity).to.equal(7);
    });

    it('itemmarket', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('itemmarket_itemmarket'));

        const initialReturn = await torn.itemmarket.itemmarket('61');
        expect(TornAPI.isError(initialReturn)).to.be.false;
        expect(stub.args[0][0]).to.contain('/61?');

        const castedReturn = initialReturn as IMarketItem[];

        // spot check one
        const item = castedReturn.find(x => x.ID === 131761544);
        expect(item?.cost).to.equal(320);
        expect(item?.quantity).to.equal(1);
    });

    it('pointsmarket', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('itemmarket_pointsmarket'));

        const initialReturn = await torn.itemmarket.pointsmarket();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IPointsMarket[];

        // spot check one
        const item = castedReturn.find(x => x.id === '11112620');
        expect(item?.cost).to.equal(45400);
        expect(item?.quantity).to.equal(200);
        expect(item?.total_cost).to.equal(9080000);
    });

    it('all', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('itemmarket_all'));

        const initialReturn = await torn.itemmarket.all('61');
        expect(TornAPI.isError(initialReturn)).to.be.false;
        expect(stub.args[0][0]).to.contain('/61?');
        expect(stub.args[0][0]).to.contain('bazaar');
        expect(stub.args[0][0]).to.contain('itemmarket');

        const castedReturn = initialReturn as IMarketItem[];

        // spot check one from each
        let item = castedReturn.find(x => x.ID === 131761544);
        expect(item?.cost).to.equal(320);
        expect(item?.quantity).to.equal(1);

        item = castedReturn.find(x => x.ID === 11616293);
        expect(item?.cost).to.equal(750);
        expect(item?.quantity).to.equal(10);
    });
});
