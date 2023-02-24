import mongoose from "mongoose"


const main=async ()=>{
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster.nszsxvk.mongodb.net/smartRabbit?retryWrites=true&w=majority`)
        console.log("database Connected")
        
    }catch(error){
      console.log(error)
    }

}

export default main;