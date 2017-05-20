var express = require('express');
var router = express.Router();
//mongo服务
var mongodb=require('mongodb').MongoClient;
//数据库地址
var db_str='mongodb://localhost:27017/boke2'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/form',function(req,res,next){
//	res.send('注册成功')
		//获取表单数据
		var user=req.body['user']
		var pwd=req.body['pwd']
		var email=req.body['email']
//		res.send(email)
		//插入函数
		var insertdata=function(db,callback){
			//找到要插入的集合
			var coll=db.collection('message')
			//设置需要插入集合的文档数据
			var data=[{user:user,pwd:pwd,email:email}]
			coll.insert(data,function(err,result){
				if(err){
					console.log(err)
				}else{
					callback(result)
				}
			})
		}
		
		//链接数据库 
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log(err)
			}else{
				console.log('链接成功')
				//调用插入函数
				insertdata(db,function(result){
					console.log(result)
				})
				//res.send('恭喜你，注册成功')
				res.redirect('/login')
				//关闭数据库
				db.close()
			}
		})
})


router.post('/login',function(req,res,next){

		var user=req.body['user']
		var pwd=req.body['pwd']
		
		//插入函数
		var finddata=function(db,callback){
			//找到要查找的集合
			var coll1=db.collection('message')
			//
			var data={user:user,pwd:pwd}
			coll1.find(data).toArray(function(err,result){
				callback(result)
			})
		}
		
		//链接数据库 
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log(err)
			}else{
				console.log('链接成功2222')
				//调用插入函数
				finddata(db,function(result){
					console.log(result)
					if(result.length>0){
						req.session.user=result[0].user
						res.redirect('/')
						//关闭数据库
						db.close()
					}else{
						res.send('登录失败')
						
					}
				})
				
			}
		})
})
//留言
router.post('/list',function(req,res,next){
		var user=req.session.user
		if(user){
			var title=req.body['title']
			var con=req.body['con']
			//插入函数
			var insertdata=function(db,callback){
				//找到要插入的集合
				var coll2=db.collection('liuyan')
				//设置需要插入集合的文档数据
				var data=[{title:title,con:con}]
				coll2.insert(data,function(err,result){
					if(err){
						console.log(err)
					}else{
						callback(result)
					}
				})
			}
			
			//链接数据库 
			mongodb.connect(db_str,function(err,db){
				if(err){
					console.log(err)
				}else{
					console.log('链接成功')
					//调用插入函数
					insertdata(db,function(result){
						console.log(result)
						res.redirect('/users/showlist')
						//关闭数据库
						db.close()
					})
					
				}
			})
		}else{
			res.send('亲，请先登录')
		}
})

//
router.get('/showlist',function(req,res,next){
	//获取集合内的留言数据
	//查询函数
		var findData=function(db,callback){
			//找到要查询的集合
			var coll3=db.collection('liuyan')
			coll3.find({}).toArray(function(err,result){
				callback(result)
			})
		}
		//链接数据库 
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log(err)
			}else{
				console.log('链接成功11111')
				//调用查询函数
				findData(db,function(result){
					res.render('showlist',{shuju:result})
					console.log(result)
				})
			}
		})
	
	
})
module.exports = router;
