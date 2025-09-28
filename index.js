import mongoose from "mongoose"; 
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import express from "express";
// import {app} from './app.js'

dotenv.config({ path: "./.env" });



const app = express();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running on port ${process.env.PORT || 8000}`)
    });
})
.catch((error)=>{
    console.error("ERROR",error)
})








