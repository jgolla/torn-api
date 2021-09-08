import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { IPersonalStats } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('User API', () => {

    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('personalstats', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_personalstats'));

        const initialReturn = await torn.user.personalstats();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IPersonalStats;
        expect(castedReturn.bestkillstreak).to.equal(999);
        expect(castedReturn.totalbountyreward).to.equal(245245450245245);
    });

    it('personalstats with timestamp', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('user_personalstats'));
        await torn.user.personalstats(123456);
        expect(stub.args[0][0]).to.equal('https://api.torn.com/user/?selections=personalstats&key=key&timestamp=123456');
    });
});
