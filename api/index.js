// First step 
import express from "express"

// Fourth step
import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose";


import cookieParser from "cookie-parser";

import cors from "cors";

const app=express()

//Fifth step

const connect=async()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB.")
  } catch (error) {
    throw error
  }

};

// it is initial connection if there is problem it not able to connect again and again its not gonna try but if initial connection 
// is okay then there is some problem in MONGODB it will try to connect again

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!")
})

// 10 th step
// By deafault we can not send any json object like this to an wxpress server to correct this we are gonna use another middleware here
// middlewares
//  that because it is able to our request and response before sending anything to user  
// basically whenever i run my application it gonna ready for any api request and as soon as a user make an api request it gonna come
// here and check all middlewares
// on using insomnia we get unique id of our document
app.use(cors());
app.use(cookieParser())
app.use(express.json());



// 8th step

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";


// Third step 

app.listen(8800,()=> {
    connect()
    console.log("connected to backend!");
})
// 9th step creating middleware

// app.use("/auth",authRoute);

// whenever we made request for the endpoint /auth it goona use our route here authRoute and it goona look at "/" endpoints
// see auth.js

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// sixth step

app.get("/",(req,res)=>{
    res.send("hello first request!")
})