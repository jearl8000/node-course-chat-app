const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        var testNonStr = 1000;
        expect(isRealString(testNonStr)).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        var testSpaceStr = '     ';
        expect(isRealString(testSpaceStr)).toBe(false);
    });

    it('should allow actual string values', () => {
        var goodStr = ' FooBarBazz ';
        expect(isRealString(goodStr)).toBe(true);
    });
    
});