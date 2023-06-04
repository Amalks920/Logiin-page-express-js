const schema=require('../schema/userSchema');

const bcrypt=require('bcrypt');



module.exports={

    //insert user details into db
    userSignUp:(userDetails)=>{

        //hashing the password
        const salt=bcrypt.genSaltSync(12);
        const hash=bcrypt.hashSync(userDetails.password,salt);
       
        
        return new Promise(async(resolve,reject)=>{
            const {username:username,email:email,password:password}=schema;
            
            

            //create new document inside db
            const user= new schema({
            username:userDetails.username,
            email:userDetails.email,
            password:userDetails.password
        })
        user.password=hash
        await user.save()

        //find the document that added and resolve it.
        schema.findOne({username:user.username}).then((user)=>{
            
             resolve(user)
          })
          
        })
        
    },

    userLogin:(userDetails)=>{

        return new Promise(async (resolve,reject)=>{
            schema.findOne({email:userDetails.email}).then((user)=>{
                  
                
                
                  if(userDetails.email===user.email){
                    console.log(userDetails.email)
                    console.log(user.email)
                    
                    bcrypt.compare(userDetails.password,user.password).then((result)=>{

                        if(result) resolve(true)

                        else resolve(false)
                        
                    })
                    
                    
                    
                  }else{
                    resolve(false)
                  }
                
             })
        })
    }
}

