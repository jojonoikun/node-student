//db.js
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',//mysql数据库的ip地址
    user: 'root',//连接账号
    password: '',
    port: '3306',//端口号
    database: 'sp',//连接数据库名
    timezone: 'SYSTEM'
});
exports.conn = conn;