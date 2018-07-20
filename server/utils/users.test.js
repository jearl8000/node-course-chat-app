const expect = require('expect');
const {Users} = require ('./users.js');

describe('Users class', () => {
    var users;

    // seed data
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Jearl',
            room: 'Office Pool'
        };
        var response = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
        
    });

    it('should remove a user', () => {
        var deletedUser = users.removeUser('1');
        expect(deletedUser).toInclude({name: 'Mike', room: 'Node Course'});
        expect(users.users.length).toBe(2);
    });

    it('should not remove user for out-of-range id', () => {
        var deletedUser = users.removeUser('5');
        expect(deletedUser).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var myUser = users.getUser('2');
        expect(myUser).toInclude({name: 'Jen', room: 'React Course'});
    });

    it('should not find user', () => {
        var myUser = users.getUser('5');
        expect(myUser).toBeFalsy();
    });

    it('should return names for Node Course room', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for React Course room', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });
});