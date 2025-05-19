const mongoose = require('mongoose')
const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("mogodb atlas connected successfully with mainServer");
    
}).catch(err=>{
    console.log("Mogodb Atlas connection failed");
    console.log(err);    
})