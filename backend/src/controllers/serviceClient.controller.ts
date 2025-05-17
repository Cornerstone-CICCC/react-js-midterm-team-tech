import { Request, Response } from "express";
import { IService, Service } from "../models/service.model";

const getAllServiceList = async (req: Request, res: Response) => {
   try {
      const services = await Service.find()
      res.send(services)
   } catch (error) {
      console.error(error)
      res.status(404).send({
         message: "error"
      })
   }
}

const getServiceById = async (req: Request<{ id: string }>, res: Response) => {
   try {
      const services = await Service.findById(req.params.id)
      res.status(200).send(services)
   } catch (error) {
      console.error(error)
      res.status(404).send({
         message: "unable to find service"
      })
   }
}


export default {
   getAllServiceList,
   getServiceById
}