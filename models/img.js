const db = require('../util/database');

module.exports = class Image {
  constructor(image_id, aid, image_url, points) {
    this.image_id = image_id;
    this.aid = aid;
    this.image_url = image_url;
    this.points = points;

  }

  static fetchAll() {
    return db.execute('SELECT images.image_id, images.aid, images.image_url, images.points as points, account.name as name, account.avatar as avatar FROM images JOIN account ON images.aid = account.aid'); //** */
  }

  static updatePoints(imageId, newPoints) {
    return db.execute('UPDATE images SET points = ? WHERE image_id = ?', [newPoints, imageId]);
  }

  static fetchTopTen() {
    return db.execute('SELECT image_id, aid,image_url, points FROM images ORDER BY points DESC LIMIT 10');
  }

  static fetchTopTenUser() {
    return db.execute('SELECT * FROM account');
  }

  static onlyone(aid) {
    return db.execute('SELECT * , image_url, account.name as name, points FROM images INNER JOIN account on images.aid = account.aid WHERE images.aid = ?', [aid]);
  }

  static upload(image_url, aid) {
    return db.execute('INSERT INTO images (image_url, aid) VALUES (?, ?)', [image_url, aid]);
  }
};