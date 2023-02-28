//index.js
const app = require('express')();
//中间件
app.use((req,resp,next) => {
    //中文乱码处理
    resp.header('Content-Type','text/html;charset=utf-8');
    next();
});
app.use((req,resp,next) => {
    //跨域设置
    resp.header("Access-Control-Allow-Credentials", true);
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    resp.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    resp.header("X-Powered-By", ' 3.2.1');
    resp.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//添加解析参数模块，能够解析POST方式提交的参数
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
//引入路由模块
const {routes} = require('./routes/index');
routes(app);
app.listen(9001);
console.log('服务器启动完毕');