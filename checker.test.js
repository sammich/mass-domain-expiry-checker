const whois = jest.mock('whois');
const tlds = jest.mock('./tlds');

const checker = require('./checker');

describe('lookupExpiryForDomain', () => {
    it('returns a Promise', () => {
        const prom = checker.lookupExpiryForDomain('tomato.mockdomain.defaultdateformat');
        expect(prom).toBeInstanceOf(Promise);
        
        return prom;
    });
    
    it('resolves with default date', () => {
        const prom = checker.lookupExpiryForDomain('tomato.mockdomain.defaultdateformat');
        
        return prom.then(res => {
            expect(res).toMatch(/2018-09-21/);
            expect(res).toMatch(/.+([0-9]+ days)/);
        });
    });
    
    it('resolves with explicit date pattern', () => {
        const prom = checker.lookupExpiryForDomain('tomato.mockdomain.explicitdateformat');
        
        return prom.then(res => {
            expect(res).toMatch(/2018-09-29/);
            expect(res).toMatch(/([0-9]+ days)/);
        });
    });
    
    it('rejects when whois.lookup errors', () => {
        const prom = checker.lookupExpiryForDomain('tomato.mockdomain.lookuperror');
        
        return prom.catch(err => {
            expect(err).toBeDefined();
        });
    });
    
    it('rejects when no match is found', () => {
        const prom = checker.lookupExpiryForDomain('tomato.mockdomain');
        
        return prom.catch(err => {
            expect(err).toBeDefined();
        });
    });
    
    it('rejects tld pattern not defined', () => {
        const prom = checker.lookupExpiryForDomain('tomato.mockdomain.NOTDEFINEDINMOCKFILE');
        
        return prom.catch(err => {
            expect(err).toBeDefined();
        });
    });
    
    it('rejects tld is in blacklist', () => {
        const prom = checker.lookupExpiryForDomain('tomato.mockdomain.blacklisted');
        
        return prom.catch(err => {
            expect(err).toBeDefined();
        });
    });
});
