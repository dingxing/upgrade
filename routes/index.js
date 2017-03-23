var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images/user'});
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');



/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('base', { title: 'Express' });
});

router.post('/', function(req, res, next) {
	res.render('base', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
	var session = req.session;
	console.log("------------>",session);
	res.render('login', { title: 'Express' });
});

router.post('/confirm', function(req, res, next) {
	　var user={
		　　　　username:'1',
		　　　　password:'1'
	　　}
	console.log("username->",req.body.username);
	console.log("password->",req.body.password);

	　　if(req.body.username==user.username&&req.body.password==user.password) {
		res.render('base');
	　　}else{
		res.render('login'); 
	　　}
});

router.get('/test', function(req, res, next) {
	res.render('test', { title: 'Express' });
});


router.get('/update.html', function(req, res, next) {
	res.render('update', { title: 'Express' });
});


router.post("/upload",function(req,res){
	console.log("uoload 被调用！");
	var form = new formidable.IncomingForm(); 
	console.log("about to parse");
	form.uploadDir="./temp";//必须设置


	form.parse(req,function(error,fields,files){
		console.log("parsing done");

		fs.renameSync(files.upload.path,"./temp/"+fields.username+".png");

		res.writeHead(200,{"Content-Type":"text.html"});
		res.write("received image:<br/>");
		//res.write("<img src='./TEMP/undefined.png'/>");
		res.end();
	});
});

router.get('/ajax', function(req, res, next) {
	res.render('ajax');
});
  
router.post('/req_ajax', function(req, res, next){
    /* req.body对象
       包含POST请求参数。
       这样命名是因为POST请求参数在REQUEST正文中传递，而不是像查询字符串在URL中传递。
       要使req.body可用，可使用中间件body-parser
       */
       var type = req.body.type;
       var info = req.body.info;
       console.log("服务器收到一个Ajax ["+type+"] 请求，信息为："+info);
       res.json(['success', "服务器收到一个Ajax ["+type+"] 请求，信息为："+info]);
   });

router.get('/req_ajax', function(req, res, next){
    /* req.query对象
       通常称为GET请求参数。
       包含以键值对存放的查询字符串参数
       req.query不需要任何中间件即可使用
       */
       var type = req.query.type;
       var info = req.query.info;
       console.log("服务器收到一个Ajax ["+type+"] 请求，信息为："+info);
       res.json(['success', "服务器收到一个Ajax ["+type+"] 请求，信息为："+info]);
   });

module.exports = router;
