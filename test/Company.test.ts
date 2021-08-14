import axios from 'axios';
import { expect } from 'chai';
import sinon = require('sinon');

import { TornAPI } from '../lib';
import { ICompanyEmployee, ICompanyProfile } from '../lib/Interfaces';
import { TestHelper } from './utils/TestUtils';

describe('Company API', () => {

    let torn: TornAPI;
    before(() => {
        torn = new TornAPI('key');
    });

    afterEach(sinon.restore);

    it('employees', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('company_employees'));

        const initialReturn = await torn.company.employees();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ICompanyEmployee[];

        // spot check one
        const employee = castedReturn.find(x => x.id === '1819862');
        expect(employee?.name).to.equal('AbsoluteQueen');
        expect(employee?.last_action.relative).to.equal('51 minutes ago');
    });

    it('employees with id', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('company_employees'));

        const initialReturn = await torn.company.employees('1234');
        expect(TornAPI.isError(initialReturn)).to.be.false;
        expect(stub.args[0][0]).to.include('/1234?');
    });

    it('profile', async () => {
        sinon.stub(axios, 'get').resolves(TestHelper.getJSON('company_profile'));

        const initialReturn = await torn.company.profile();
        expect(TornAPI.isError(initialReturn)).to.be.false;

        const castedReturn = initialReturn as ICompanyProfile;
        expect(castedReturn.name).to.equal('Shepherds of Fire');

        // spot check one
        const employee = castedReturn.employees.find(x => x.id === '2488292');
        expect(employee?.name).to.equal('Broadway');
        expect(employee?.last_action.relative).to.equal('2 days ago');
    });

    it('profile with id', async () => {
        const stub = sinon.stub(axios, 'get').resolves(TestHelper.getJSON('company_profile'));

        const initialReturn = await torn.company.profile('1234');
        expect(TornAPI.isError(initialReturn)).to.be.false;
        expect(stub.args[0][0]).to.include('/1234?');
    });
});
