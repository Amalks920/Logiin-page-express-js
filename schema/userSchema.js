const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    
})

const user=mongoose.model('Users', userSchema)

module.exports=user;
