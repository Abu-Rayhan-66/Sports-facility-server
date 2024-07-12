import mongoose from "mongoose";
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
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  facility: {
    type: mongoose.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  payableAmount: {
    type: Number,
  },
  isBooked: {
    type: String,
    default: 'no',
  },
});

const bookingModel = mongoose.model<TBooking>("Booking", bookingSchema);
export default bookingModel;