import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { IBank } from '../lib/Interfaces';

describe('Torn API', () => {

    afterEach(sinon.restore);

    it('should handle successs', async () => {

        const stub = sinon.stub(axios, 'get').resolves(JSON.parse(`{
                "data": {
                    "bank": {
                        "1w": 39.45,
                        "2w": 42.93,
                        "1m": 49.37,
                        "2m": 47.38,
                        "3m": 54.87
                    }
                }
            }`));

        const torn = new TornAPI('myKey');
        const bankReturn = await torn.torn.bank();
        expect(TornAPI.isError(bankReturn)).to.be.false;

        const bank = bankReturn as IBank;
        expect(bank['1m']).to.equal(49.37);
    });
});
