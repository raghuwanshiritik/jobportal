const mongoose  =require('mongoose')
// const url = "mongodb://127.0.0.1:27017/blogproject"
const live_Url = "mongodb+srv://ritikraghuwanshi728:raghuwanshi123@cluster0.j1bqw2h.mongodb.net/jobportal"


const connectdb =()=>{
    return mongoose.connect(live_Url)



    .then(()=>{
        console.log('Database connected..')
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports =connectdb
