import express from "express";

import Hotel from "../models/Hotel.js";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
    
  } from "../controllers/hotel.js";

import { verifyAdmin } from "../utils/verifyToken.js";

// seventh step

const router=express.Router();
// 8 th step

// CREATE
// we are makin new hotel for that we are making async because we are gonna try connecting db create new collection and new document 
// inside its gonna take time so async
// 9th step 
// router.post("/",async(req,res)=>{
//     const newHotel= new Hotel(req.body)

//     try{
//         const savedHotel= await newHotel.save()
//         res.status(200).json(savedHotel)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router