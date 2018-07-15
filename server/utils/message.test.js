const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message.js');

describe('Generate message', () => {
    it('should generate correct message object', () => {
        var res = generateMessage('Sender', 'MessageText');
        expect(res.from).toBe('Sender');
        expect(res.text).toBe('MessageText');
        expect(res.createdAt).toBeA('number');
        
    });
});

describe('Generate location URL', () => {
    it('should generate correct location message', () => {
        var coords = {
            latitude: 45.99,
            longitude: 75.6666
        };
        var res = generateLocationMessage('Sender', coords.latitude, coords.longitude);
        expect(res.from).toBe('Sender');
        expect(res.url).toBe('https://www.google.com/maps?q=45.99,75.6666');
        expect(res.createdAt).toBeA('number');
        
    });
});