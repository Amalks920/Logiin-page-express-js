const mongoose=require('mongoose')

const Schema=mongoose.Schema;


const userSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:false,
        lowercase:true,
    },
    email:{
        type:String,
        require:true,
        unique:false,
        lowercase:true,
    },
    password:{
        type:String,
        require:false,
        unique:true
    },
    
})

const user=mongoose.model('Users', userSchema)




module.exports=user;
