import mongoose from "mongoose"


const connection=async ()=>{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster.nszsxvk.mongodb.net/SmartRabbitDB?retryWrites=true&w=majority`)
}

export default connection;