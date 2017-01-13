const tlds = require('./tlds');
const moment = require('moment');

describe('module exports', () => {
    it('patterns object', () => {
        expect(tlds.patterns).toBeDefined();
    });
    
    it('blacklist', () => {
        expect(tlds.blacklist).toBeDefined();
        expect(tlds.blacklist instanceof Array).toBe(true);
    });
});

Object.keys(tlds.patterns).forEach(tld => {
    let testData, hasTestData = true;
    try {
        testData = require(`./tld-pattern${tld}.test-data`);
    } catch (err) {
        if (err.toString().match(/Cannot find module/))
            hasTestData = false;
        else
            return console.error(err);
    }
    
    describe(`${tld} pattern`, () => {
        it('test data file exists', () => {
            expect(hasTestData).toBe(true);
        });
        
        if (hasTestData) {
            let expiry;
            const pttn = tlds.patterns[tld];
            testData.response.split('\n').forEach(ln => {
                if (pttn[0].test(ln)) {
                    expiry = ln.match(pttn[1])[1];
                    expiry = moment(expiry, pttn[2]).format('YYYY-MM-DD');
                }
            });
            
            it('correct date extracted from response', () => {
                expect(expiry).toBe(testData.expiry);
            });
        }
    });
});