const mysql = require('mysql2');

const config = require('../config/config.json');

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('การเชื่อมต่อกับฐานข้อมูลถูกตัด');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('มีจำนวนการเชื่อมต่อมากเกินไปกับฐานข้อมูล');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('การเชื่อมต่อถูกปฏิเสธ');
        }
    }

    if (connection) {
        connection.release();
        console.log('เชื่อมต่อกับฐานข้อมูลแล้ว');
    }

    return;
});

module.exports = pool.promise();