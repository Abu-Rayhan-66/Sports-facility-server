import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingSchema } from "./booking.validation";
import { bookingController } from "./booking.controller";


const bookingRoute = Router()

bookingRoute.post('/', auth('user'), validateRequest(createBookingSchema),bookingController.createBooking)

bookingRoute.get('/', auth('admin'),bookingController.getAllBooking)

bookingRoute.get('/user', auth('user'),bookingController.viewBookingsByUser)

bookingRoute.delete('/:id', auth('user'), bookingController.cancelBooking);


export default bookingRoute