import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { ItemMarket, TornAPI, Torn, Company, Faction, Property, User } from '../lib';
import { TestHelper } from './utils/TestUtils';

describe('Check error handling', () => {

    beforeEach(() => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('errorTest'));
    });

    afterEach(sinon.restore);

    type TornType = ItemMarket | Torn | Company | Faction | Property | User;

    function testErrors(name: string, className: TornType, ignoreList: string[], unimplementedList: string[] = []) {
        const torn = new TornAPI('myKey');
        const igores = [...ignoreList, ...unimplementedList];
        const methods = Object.getOwnPropertyNames(className).filter(x => !igores.includes(x));
        methods.forEach(method => {
            it(`${method} handles error`, async () => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const retValue = await ((torn as any)[name] as any)[method]();
                expect(TornAPI.isError(retValue)).to.be.true;
            });
        });

        unimplementedList.forEach(method => {
            it(`${method} should not be implemented`, async () => {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    await ((torn as any)[name] as any)[method]();
                    // shouldn't get here
                    expect(false).to.be.true;
                } catch (err) {
                    expect((err as Error).message).to.equal('Method not implemented.');
                }
            });
        });
    }

    describe('company', () => {
        testErrors('company', Company.prototype, ['constructor'], ['applications', 'detailed', 'news', 'newsfull', 'stock']);
    });

    describe('faction', () => {
        testErrors('faction', Faction.prototype, ['constructor', 'fixStringMap'], ['boosters', 'cesium', 'contributors', 'temporary']);
    });

    describe('item market', () => {
        testErrors('itemmarket', ItemMarket.prototype, ['constructor']);
    });

    describe('property', () => {
        testErrors('property', Property.prototype, ['constructor']);
    });

    describe('torn', () => {
        testErrors('torn', Torn.prototype, ['constructor']);
    });

    describe('user', () => {
        testErrors('user', User.prototype, ['constructor'], ['bazaar', 'display', 'reports', 'weaponexp']);
    });
});
