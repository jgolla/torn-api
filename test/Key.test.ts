import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';

import { TornAPI } from '../lib';
import { KeyInfoResponse, KeyLogResponse } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Key Info API', () => {
    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('info', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('api_key_info'));

        const initialReturn = await torn.key.info();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as KeyInfoResponse;

        expect(castedReturn.access.level).to.equal(3);
        expect(castedReturn.access.type).to.equal('Limited Access');
        expect(castedReturn.selections.company).to.eql([
            'applications',
            'companies',
            'detailed',
            'employees',
            'news',
            'profile',
            'stock',
            'timestamp',
            'lookup'
        ]);
    });

    it('key->info', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('api_key_info'));

        const initialReturn = await torn.key.key(['info']);
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as KeyInfoResponse;

        expect(castedReturn.access.level).to.equal(3);
        expect(castedReturn.access.type).to.equal('Limited Access');
        expect(castedReturn.selections.company).to.eql([
            'applications',
            'companies',
            'detailed',
            'employees',
            'news',
            'profile',
            'stock',
            'timestamp',
            'lookup'
        ]);
    });

    it('key->log', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('api_key_log'));

        const initialReturn = await torn.key.key(['log']);
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as KeyLogResponse;

        expect(castedReturn).to.have.length(2);
        expect(castedReturn[1].selections).to.equal('bars,cooldowns,icons,refills');
        expect(castedReturn[1].comment).to.be.null;
    });
    
    it('log', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('api_key_log'));

        const initialReturn = await torn.key.log();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as KeyLogResponse;

        expect(castedReturn).to.have.length(2);
        expect(castedReturn[1].selections).to.equal('bars,cooldowns,icons,refills');
        expect(castedReturn[1].comment).to.be.null;
    });
});

