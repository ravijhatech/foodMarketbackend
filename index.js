import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./src/config/dbConnection.js";
import  blogRouter from './src/routes/blogRouter.js'
dotenv.config({path:'.env'})

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/v1', blogRouter);

connectDB();

app.listen(process.env.PORT,()=>{
console.log(`server is running ${process.env.PORT}`);

})

