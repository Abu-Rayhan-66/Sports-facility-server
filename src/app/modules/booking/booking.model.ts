import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  payableAmount: {
    type: Number,
  },
  priceInHour: {
    type: Number,
  },
  booking: {
    type: Schema.Types.ObjectId,
    
  },
  transactionId: {
    type: String,
  },
  isBooked: {
    type: String,
    default: "no",
  },
});

const BookingModel = mongoose.model<TBooking>("Booking", bookingSchema);
export default BookingModel;
