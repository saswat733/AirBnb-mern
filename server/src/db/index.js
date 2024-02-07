import {mongoose} from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB= async()=>{
    try {
        const connectInstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`mongodb connected!! DB Host: ${connectInstance.connection.host}`)
    } catch (error) {
        console.log('mongoDB connection failed:',error);
        process.exit(1);
        // The exit code 1 typically indicates an error or abnormal termination of the program
    }
}

export default connectDB;