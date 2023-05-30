var express = require('express');
var router = express.Router();
var userHeplper=require('../helpers/user-helper')


//middleware for authentication
var sessionChecker=(req,res,next)=>{
 

  if(req.session.user){
    next()
  }else{
    res.redirect('/')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect('/home');
  }else{
    res.render('index')
  }
 
});

router.get('/home',sessionChecker,(req,res,next)=>{
  res.render('home')
})

router.post('/login',(req,res,next)=>{
  req.session.user=req.body
   // userHeplper.insertUser(req.body).then((result)=>{

//  })

  req.session.user=req.body
  res.redirect('/home')
  
    
})

//signup

router.get('/signup',(req,res,next)=>{
  if(req.session.user){
    res.redirect('/home')
  }else{
    res.render('signup')
  }
  
})

router.get('/logout',(req,res,next)=>{
  req.session.destroy()
 
  res.redirect('/')
})


router.post('/signup',(req,res,next)=>{
  req.session.user=req.body

  userHeplper.userSignUp(req.body).then((result)=>{
    console.log(result)
  })
  // userHeplper.insetUser(req.body).then((result)=>{
  //   console.log(result)
  // })
  res.redirect('/home')
})



module.exports = router;
