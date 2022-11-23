import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';

import { TornAPI } from '../lib';
import { IKeyInfo } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Key Info', () => {
    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('key info', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('key_info_test'));
        // console.log(TestHelper.getJSON('key_info_test'));
        const initialReturn = await torn.key.info();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IKeyInfo;
        expect(castedReturn.access_level).to.equal(3);
        expect(castedReturn.access_type).to.equal('Limited Access');
    });

    // const castedReturn = initialReturn as IKeyInfo;
    // console.log(castedReturn);
    // expect(castedReturn.owner_id).to.equal(1948203);
    // expect(castedReturn.upgrades).to.have.members(["Superior interior", "Large pool", "Large vault", "Hottub", "Sauna", "Bar", "Shooting range", "Medical facility", "Airstrip"]);
    // expect(castedReturn.rented.user_id).to.equal(2487726);
});
