import { Request, Response } from "express";
import { IService, Service } from "../models/service.model";
import { uploadFileToS3 } from '../utils/s3Uploader';

//Create service
const createService = async (req: Request, res: Response) => {
   if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });

      return
   } 

   const avatarUrl = await uploadFileToS3(req.file);

   try {
      const {
         name,
         height,
         age,
         nationality,
         self_introduction,
         price,
         available_time,
         price_id
      } = req.body

      const service = await Service.create({
         avatar: avatarUrl,
         name,
         height,
         age,
         nationality,
         self_introduction,
         price,
         available_time,
         price_id
      })

      res.status(201).send(service)

   } catch (error) {
      console.error(error)
      res.status(500).json({
         message: "Error on creating service."
      })
   }
}

// Update Service
const updateService = async (req: Request<{ id: string }, {}, Partial<IService>>, res: Response) => {
   try {
      const service = await Service.findById(req.params.id)
      let avatarUrl = '';

      if (!service) {
         res.status(404).json({
            message: "Service not found"
         })
         return
      }

      if (req.file) {
         avatarUrl = await uploadFileToS3(req.file);
      } else {
         avatarUrl = service.avatar
      }
   
      const modifiedData = {
         avatar: avatarUrl,
         name: req.body.name ?? service.name,
         height: req.body.height ?? service.height,
         age: req.body.age ?? service.age,
         nationality: req.body.nationality ?? service.nationality,
         self_introduction: req.body.self_introduction ?? service.self_introduction,
         price: req.body.price ?? service.price,
         available_time: req.body.available_time ?? service.available_time,
         price_id: req.body.price_id ?? service.price_id,
      }

      const updatedService = await Service.findByIdAndUpdate(req.params.id, modifiedData, {
         new: true
      })

      res.status(200).send(updatedService)
   } catch (err) {
      console.error(err)
      res.status(500).json({
         message: "Unable to update service"
      })
   }
}

//Delete service
const deleteService = async (req: Request<{ id: string }>, res: Response) => {
   try {
      const service = await Service.findByIdAndDelete(req.params.id)
      if (!service) {
         res.status(404).json({
            message: "Service not found"
         })
         return
      }
      res.status(200).send(service)

   } catch (error) {
      console.error(error)
      res.status(500).json({
         message: "Unable to delete service"
      })
   }
}


export default {
   createService,
   deleteService,
   updateService,
}