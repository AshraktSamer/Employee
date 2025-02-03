import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'
import employeerouter from "./routes/employeeRoutes";


const app = express()
app.use(cors({origin:"http://localhost:4200"}))
app.use(express.json())
dotenv.config();


const DB_URL = String(process.env.Mongo_URL)

mongoose.connect(DB_URL, {
    dbName:"Projects"
}).then(()=>{console.log(`database connected`)}).catch((error)=>console.log(error))

app.use('/',    employeerouter)


const port = process.env.PORT;  
app.listen( port , ()=> console.log(`app listen on port ${port }`))

