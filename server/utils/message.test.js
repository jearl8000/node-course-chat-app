const expect = require('expect');
const {generateMessage} = require('./message.js');

describe('Generate message', () => {
    it('should generate correct message object', () => {
        var res = generateMessage('Sender', 'MessageText');
        expect(res.from).toBe('Sender');
        expect(res.text).toBe('MessageText');
        expect(res.createdAt).toBeA('number');
        
    });
});