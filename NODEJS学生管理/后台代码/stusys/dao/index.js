//dao/index.js
exports.op = (sql,arr,conn,cb) => {
    // conn.connect();
    conn.query(sql,arr,(err,rs) => {
        if(err) {
            console.log(err.message);
            return;
        }
        cb(rs,rs.affectedRows);
    });
    // conn.end();
}