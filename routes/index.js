var express = require('express');
var router = express.Router();
var userHeplper=require('../helpers/user-helper');
const user = require('../schema/userSchema');


//middleware for authentication
var sessionChecker=(req,res,next)=>{
 

  if(req.session.user){
    next()
  }else{
    res.render('index')
  }
}

/* GET home page. */
router.get('/',sessionChecker,function(req, res, next) {
  
  res.render('home')
 
});

// router.get('/home',sessionChecker,(req,res,next)=>{
//   // res.render('home')
// })

router.post('/login',(req,res,next)=>{
  
  
   userHeplper.userLogin(req.body).then((result)=>{
      console.log(result)
      if(result===true){
        req.session.user=req.body
        res.redirect('/')
   }else{ 
    res.render('index')
  }
 })

  
  
    
})

//signup

router.get('/signup',(req,res,next)=>{
  
 
    if(req.session.user){
      res.redirect('/')
    }else{
      res.render('signup')  

    }

  
})

router.get('/logout',sessionChecker,(req,res,next)=>{
  req.session.destroy()
 
  res.redirect('/')
})


router.post('/signup',(req,res,next)=>{
  

  userHeplper.userSignUp(req.body).then((result)=>{
    res.redirect('/')
  })
  // userHeplper.insetUser(req.body).then((result)=>{
  //   console.log(result)
  // })
  
})



module.exports = router;
