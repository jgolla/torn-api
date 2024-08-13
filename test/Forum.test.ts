import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';

import { TornAPI } from '../lib';
import { ForumCategories, ForumThreadBase, ForumThreadExtended } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Forum API', () => {
    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('threads', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('forum_threads'));

        const initialReturn = await torn.forum.threads();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ForumThreadBase[];

        // spot check one
        const forum = castedReturn.find((x) => x.id === 16414258);
        expect(forum?.title).to.equal('WE - NO WAR  | 3.8m+respect  | recruiting');
        expect(forum?.author?.id).to.equal(2431991);
    });

    it('categories', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('forum_categories'));

        const initialReturn = await torn.forum.categories();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ForumCategories[];

        // spot check one
        const forum = castedReturn?.find((x) => x.id === 55);
        expect(forum?.title).to.equal('Animals & Nature');
        expect(forum?.threads).to.equal(239);
    });

    it('thread', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSONV2('forum_thread'));

        const initialReturn = await torn.forum.thread(1);
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ForumThreadExtended;

        // spot check
        expect(castedReturn?.title).to.equal('Join NPO: Highly active community, RWs, PAs');
        expect(castedReturn.author?.username).to.equal('ImperialEmperor');
    });
});
