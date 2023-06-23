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
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    } catch (error) {
        console.log('@Utils->DB',error);
    }
}
