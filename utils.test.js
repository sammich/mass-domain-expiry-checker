const utils = require('./utils');

describe('padify', () => {
    it('add trailing spaces to the desired length', () => {
        const s1 = '123'.padify(10);
        expect(s1.length).toBe(10);
        expect(s1).toBe('123       ');
    
        const s2 = ''.padify(10);
        expect(s2.length).toBe(10);
        expect(s2).toBe('          ');
    });
    
    it('add leading spaces to the desired length', () => {
        const s1 = '123'.padify(10, true);
        expect(s1.length).toBe(10);
        expect(s1).toBe('       123');
    
        const s2 = ''.padify(10, true);
        expect(s2.length).toBe(10);
        expect(s2).toBe('          ');
    })
});

jest.useFakeTimers();

describe('delayCall', () => {
    it('calls the input function after the provided delay', () => {
        const callMeLater = jest.fn();
        
        utils.delayCall(callMeLater, 1234);
        
        expect(callMeLater).not.toBeCalled();
    
        jest.runAllTimers();
    
        // Now our callback should have been called!
        expect(callMeLater).toBeCalled();
        expect(callMeLater.mock.calls.length).toBe(1);
        expect(setTimeout.mock.calls[0][1]).toBe(1234);
    });
    
    it('default delay time', () => {
        const callMeLater = jest.fn();
        
        utils.delayCall(callMeLater);
        
        expect(callMeLater).not.toBeCalled();
    
        jest.runAllTimers();
        
        // Now our callback should have been called!
        expect(callMeLater).toBeCalled();
        expect(callMeLater.mock.calls.length).toBe(1);
        expect(setTimeout.mock.calls[1][1]).toBe(1000);
    });
    
    it('throws when non-function is input', () => {
        expect(() => {
            utils.delayCall('zazzafras');
        }).toThrow();
    });
});

describe('logTwoColumnPadded', () => {
    let origLog = console.log, origError = console.warn;
    const mockLog = jest.fn(_ => _);
    const mockError = jest.fn(_ => _);
    
    beforeAll(() => {
        console.log = mockLog;
        console.error = mockError;
    });
    
    it('logs with padding', () => {
        utils.logTwoColumnPadded('asd', 'qwe', 10);
        expect(mockLog.mock.calls[0][0]).toBe('asd        | qwe');
    });
    
    it('error logs with padding', () => {
        utils.logTwoColumnPadded('asd', 'qwe', 10, true);
        expect(mockError.mock.calls[0][0]).toBe('asd        | qwe');
    });
    
    it('works with undefined strings', () => {
        utils.logTwoColumnPadded(undefined, undefined, 10);
        expect(mockLog.mock.calls[1][0]).toBe('           | ');
    });
    
    it('works with undefined strings', () => {
        expect(() => {
            utils.logTwoColumnPadded(undefined, undefined);
        }).toThrow();
    });
    
    afterAll(() => {
        console.log = origLog;
        console.error = origError()
    });
});