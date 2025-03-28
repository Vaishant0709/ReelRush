import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI!;

if(!MONGODB_URI){
  throw new Error("Please define mongodb uri in .env file");
}

let cached=global.mongoose;

if(!cached){
  cached=global.mongoose = { conn : null , promise : null}
}


export async function connectToDatabase(){
  
    if(cached.conn){
      return cached.conn;
    }
    if(!cached.promise){
      const opts={
        bufferCommands : true,
        maxPoolSize : 10
      };
    
    cached.promise = mongoose.connect(MONGODB_URI,opts)
    .then(()=>mongoose.connection);
    }

    try {
      cached.conn = await cached.promise
      console.log('Connected to DB');
      

    } catch (error) {
      cached.promise=null;
      console.log(`ERROR :: DB CONNECT : ${error}`);
      throw error;
    }
    console.log(cached.conn);
    
    return cached.conn
  
}