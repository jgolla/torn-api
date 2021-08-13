import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { IProperty } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Property API', () => {

    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('property', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('property'));

        const initialReturn = await torn.property.property();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IProperty;
        expect(castedReturn.owner_id).to.equal(1948203);
        expect(castedReturn.upgrades).to.have.members(["Superior interior", "Large pool", "Large vault", "Hottub", "Sauna", "Bar", "Shooting range", "Medical facility", "Airstrip"]);
        expect(castedReturn.rented.user_id).to.equal(2487726);
    });

    it('property with id', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('property'));
        await torn.property.property('123456');
        expect(stub.args[0][0]).to.equal('https://api.torn.com/property/123456?selections=property&key=key');
    });
});
