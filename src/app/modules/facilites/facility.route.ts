import express from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createFacilityValidationSchema, updateFacilityValidationSchema } from "./facility.validation";
import { facilityController } from "./facility.controller";


const facilityRoute = express.Router();

// only admin can access 

facilityRoute.post('/',auth('admin'),validateRequest(createFacilityValidationSchema),facilityController.createFacility);

facilityRoute.put('/:id', auth('admin'), validateRequest(updateFacilityValidationSchema) ,facilityController.updateFacility)

facilityRoute.delete('/:id', auth('admin') ,facilityController.deleteFacilityByID)


// anyone can access 
facilityRoute.get('/',facilityController.getAllFacility)

export default facilityRoute