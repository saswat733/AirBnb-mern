import dotenv from 'dotenv'

import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path:'./env'
})

connectDB().then(()=>{
    app.on('error',(error)=>{
        console.log('error',error);
        throw error;
        
    })
    console.log(`server is running on port ${process.env.PORT}`)
    app.listen(process.env.PORT || 8000,()=>{
    })
}).catch((err)=>{
    console.log('MONGO connection failed',err);
})