const db = require('../util/database');

module.exports = class User {
    constructor(avatar, name, email, password) {
        this.avatar = avatar;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static find(email) {
        return db.execute('SELECT * FROM account WHERE email = ?',[email]);
    }

    static finduserId(userId) {
        return db.execute('SELECT * FROM account WHERE aid = ?', [userId]);
    }

    static save(user) {
        return db.execute(
            'INSERT INTO account (avatar, name, email, password) VALUES (?, ?, ?, ?)',
            [user.avatar, user.name, user.email, user.password]
        )
    }

    static getCurrentUser() {
        return db.execute('SELECT name FROM account',);
    }

    static getaccount() {
        return db.execute('SELECT * FROM account',);
    }

    static updatePassword(userId, newPassword) {
        return db.execute(
            'UPDATE account SET password = ? WHERE aid = ?',
            [newPassword, userId]
        );
    }

    static updateName(userId, newName) {
        return db.execute(
            'UPDATE account SET name = ? WHERE aid = ?',
            [newName, userId]
        );
    }

    static updateAvatar(userId, newAvatarImg) {
        return db.execute(
            'UPDATE account SET avatar = ? WHERE aid = ?',
            [newAvatarImg, userId]
        );
    }
};

