const mongoose=require('mongoose')


// const uri=process.env.MONGODB_CONNECTION_STRING;
const uri="mongodb+srv://amalks999:amalks@cluster0.2ypyv1c.mongodb.net/?retryWrites=true&w=majority"


mongoose.set('strictQuery',true)
mongoose.connect(uri,{useUnifiedTopology:true})

const connection=mongoose.connection



module.exports=connection