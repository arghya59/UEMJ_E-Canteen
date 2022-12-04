const mongoose = require("mongoose")
//Database connectivity...
mongoose.connect(`mongodb://localhost:27017/uemCanteen` , {
    useNewUrlParser : true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`Database Connected to : uemCanteen`)
}).catch((e)=>{
    throw new Error(e)
})