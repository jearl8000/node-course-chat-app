class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        // return user that was removed
        var users = this.users.filter((user) => {
            return user.id === id;
        });
        var newUsers = this.users.filter((user) => user.id !== id);
        this.users = newUsers;
        return users[0];
    }
    getUser (id) {
        var user = this.users.filter((user) => user.id === id);
        return user[0];
    }
    getUserList (room) {
        // return array of strings
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};