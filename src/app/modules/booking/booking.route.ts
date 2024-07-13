import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingSchema } from "./booking.validation";
import { bookingController } from "./booking.controller";


const bookingRoute = Router()

bookingRoute.post('/bookings', auth('user'), validateRequest(createBookingSchema),bookingController.createBooking)

bookingRoute.get('/bookings', auth('admin'),bookingController.getAllBooking)

bookingRoute.get('/bookings/user', auth('user'),bookingController.viewBookingsByUser)


bookingRoute.get('/check-availability',  bookingController.checkAvailability);


export default bookingRoute