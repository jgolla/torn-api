/**
 */
import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';

import { TornAPI } from '../lib';
import { IAPIKeyInfo } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Key Info API', () => {
    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('info', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('api_key_info'));

        const initialReturn = await torn.key.info();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as IAPIKeyInfo;

        expect(castedReturn.access_level).to.equal(4);
        expect(castedReturn.access_type).to.equal('Full Access');
        expect(castedReturn.selections.company).to.eql([
            'applications',
            'companies',
            'detailed',
            'employees',
            'news',
            'newsfull',
            'profile',
            'stock',
            'timestamp',
            'lookup'
        ]);
    });
});
