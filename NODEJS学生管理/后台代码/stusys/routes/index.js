//routes/index.js
exports.routes = app => {
    let {op} = require('../dao/index');
    let {conn} = require('../db');
    //http://localhost:9001/ld
    app.get('/ld',(req,resp) => {
        //获取页面大小rows和页码page
        let {page,rows,search} = req.query;
        page = parseInt(page);
        rows = parseInt(rows);
        search = '%' + search + '%';
        op('select * from stuinfo where sname like ? limit ?,?',
            [search,(page - 1) * rows,rows],conn,rs => {
            op('select count(*) ct from stuinfo where sname like ?',
                [search],conn,rs1 => {          
                let data = {
                    total: rs1[0].ct,
                    rows: rs
                };
                resp.end(JSON.stringify(data));
            });  
        });
    });
    //http://localhost:9001/save
    app.post('/save',(req,resp) => {       
        //获取表单中的参数
        let {id,sname,sex,birth,mobile} = req.body;
        let sql = '';
        let arr = [];
        if(id) {//修改
            sql = 'update stuinfo set sname = ?,sex = ?,birth = ?,mobile = ? where id = ?';
            arr = [sname,sex,birth,mobile,id];
        } else {//新增
            sql = 'insert into stuinfo (sname,sex,birth,mobile) values(?,?,?,?)';
            arr = [sname,sex,birth,mobile];
        }
        op(sql,arr,conn,(rs,count) => {
            resp.end(`{"ret":${count}}`);
        });
    });
    //http://localhost:9001/detail
    app.get('/detail',(req,resp) => {
        let {id} = req.query;
        op('select * from stuinfo where id = ?',[id],conn,rs => {
            resp.end(JSON.stringify(rs[0]));
        })
    });
    //http://localhost:9001/del
    app.get('/del',(req,resp) => {
        let {id} = req.query;
        op('delete from stuinfo where id = ?',[id],conn,(rs,count) => {
            resp.end(`{"ret":${count}}`);
        })
    });
}