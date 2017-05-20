var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',user:req.session.user });
});
//注册
router.get('/register',function(req,res,next){
	res.render('register',{})
})
//登录
router.get('/login',function(req,res,next){
	res.render('login',{})
})



router.get('/relogin',function(req,res,next){
	req.session.destroy(function(err){		
		if(err){			
			console.log(err)		
		}else{			
			res.redirect("/")		
		}	
	})
})
router.get('/liuyan',function(req,res,next){
	res.render('liuyan',{})
})
module.exports = router;
