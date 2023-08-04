const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/jobportal'"

const connectDB=()=>{
    //for local DB
    return mongoose.connect(url)
   
    //for cloud DB
    //return mongoose.connect(database)
    .then(()=>{
        console.log("Connect Successfully")
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports=connectDB 