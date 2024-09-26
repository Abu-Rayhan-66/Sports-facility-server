import express from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createFacilityValidationSchema, updateFacilityValidationSchema } from "./facility.validation";
import { facilityController } from "./facility.controller";


const facilityRoute = express.Router();

facilityRoute.post('/',validateRequest(createFacilityValidationSchema),facilityController.createFacility);

facilityRoute.put('/:id', auth('admin'), validateRequest(updateFacilityValidationSchema) ,facilityController.updateFacility)

facilityRoute.delete('/:id', auth('admin') ,facilityController.deleteFacilityByID)

facilityRoute.get('/',facilityController.getAllFacility)
facilityRoute.get('/:id',facilityController.getSingleFacilityByID)

export default facilityRoute