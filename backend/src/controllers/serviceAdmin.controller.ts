import { Request, Response } from "express";
import { IService, Service } from "../models/service.model";

//Create service
const createService = async (req: Request, res: Response) => {
   try {
      const {
         avatar,
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
         avatar,
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
      res.json(500)
   }
}

// Update Service
const updateService = async (req: Request<{ id: string }, {}, Partial<IService>>, res: Response) => {
   try {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
         new: true
      })
      if (!service) {
         res.status(404).json({
            message: "Service not found"
         })
         return
      }
      res.status(200).send(service)
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