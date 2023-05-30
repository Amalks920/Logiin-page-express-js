const schema=require('../schema/userSchema');



module.exports={

    //insert user details into db
    
    userSignUp:(userDetails)=>{
       console.log(userDetails)
        return new Promise(async(resolve,reject)=>{
            const {username:username,email:email,password:password}=schema;
            
            const user= new schema({
            username:userDetails.username,
            email:userDetails.email,
            password:userDetails.password
        })

        await user.save()

        schema.findOne({username:user.username}).then((user)=>{
            
             resolve(user)
          })
          
        })
        
    }
}

