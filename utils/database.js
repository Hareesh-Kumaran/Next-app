import mongoose from "mongoose";

let isConnected=false;

export const connectToDB=async ()=>{
    mongoose.set('strictQuery',true);
    
    if(isConnected)
    {
        console.log('DB connected');
        return; 
    }
   
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "test",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    } catch (error) {
        console.log('@Utils->DB',error);
    }
}
