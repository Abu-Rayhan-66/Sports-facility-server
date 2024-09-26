import { initiatePayment } from "../payment/payment.utils";
import UserModel from "../user/user.model";
import { TBooking } from "./booking.interface";
import BookingModel from "./booking.model";

const createBookingIntoDb = async (payload: TBooking) => {
  const newBooking = await BookingModel.create(payload);
  
  const userId = payload.user
  

  const userInfo = await UserModel.findById(userId)
  if (!userInfo) {
    throw new Error("User not found");
  }

  // const transactionId = `TXN-${Date.now()}`;

  const totalPrice = payload.payableAmount
  const transactionId = payload.transactionId

  const userName = userInfo!.name
  const userEmail = userInfo!.email
  const userAddress = userInfo!.address
  const userNumber = userInfo!.phone

  const paymentData = {
    transactionId,
    totalPrice,
    userName, 
    userEmail,
    userAddress, 
    userNumber,
  }
  const paymentInfo = await initiatePayment(paymentData)
  return {
    paymentInfo,
    newBooking
  }
};

const getAllBookingFromDb = async () => {
  return await BookingModel.find().populate("facility").populate("user");
};

const getSingleBookingFromDb = async (params:string) => {
  return await BookingModel.findById(params)
};

const checkAvailability = async (date: string) => {
  const bookings = await BookingModel.find({ date });

  const availableTimeSlots = generateAvailableTimeSlots(bookings);
  return availableTimeSlots;
};

const generateAvailableTimeSlots = (bookings: TBooking[]) => {
  const openingTime = new Date("1971-01-01T08:00:00");
  const closingTime = new Date("1971-01-01T20:00:00");

  bookings.sort(
    (a, b) =>
      new Date(`1971-01-01T${a.startTime}:00`).getTime() -
      new Date(`1971-01-01T${b.startTime}:00`).getTime()
  );

  let currentTime = openingTime;
  const availableTimeSlots = [];

  for (const booking of bookings) {
    const bookingStartTime = new Date(`1971-01-01T${booking.startTime}:00`);
    const bookingEndTime = new Date(`1971-01-01T${booking.endTime}:00`);

    if (currentTime < bookingStartTime) {
      availableTimeSlots.push({
        startTime: currentTime.toISOString().substr(11, 5),
        endTime: bookingStartTime.toISOString().substr(11, 5),
      });
    }
    currentTime = bookingEndTime > currentTime ? bookingEndTime : currentTime;
  }

  if (currentTime < closingTime) {
    availableTimeSlots.push({
      startTime: currentTime.toISOString().substr(11, 5),
      endTime: closingTime.toISOString().substr(11, 5),
    });
  }

  return availableTimeSlots;
};

const viewBookingsByUserFromDB = async (userId: string) => {
  return await BookingModel.find({ user: userId }).populate("facility");
  
};

const cancelBookingById = async (bookingId: string, userId: string) => {
  // Find the booking to cancel
  const booking = await BookingModel.findOne({ _id: bookingId, user: userId });

  if (!booking) {
    return null;
  }

  booking.isBooked = "canceled";
  await booking.save();
  return booking;
};
// const updateBookingById = async (bookingId: string, updateData: string) => {
//   console.log("bookingUpdate", bookingId, updateData)
//   const updatedBooking = await BookingModel.findByIdAndUpdate( bookingId, updateData);

//   if (!updatedBooking) {
//     return null;
//   }
//   return updateBookingById;
// };

export const bookingService = {
  createBookingIntoDb,
  getAllBookingFromDb,
  checkAvailability,
  viewBookingsByUserFromDB,
  cancelBookingById,
  getSingleBookingFromDb,
  // updateBookingById
};
