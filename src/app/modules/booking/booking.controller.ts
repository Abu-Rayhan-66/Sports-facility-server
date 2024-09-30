import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";


const createBooking = catchAsync(async (req, res, ) => {
  const { startTime, endTime, priceInHour } = req.body;
  const transformedData = { ...req.body };


  const calculatePrice = (startTime: Date, endTime: Date) => {
    const startTimeInMs = startTime.getTime();
    const endTimeInMs = endTime.getTime();
    const diffInMs = endTimeInMs - startTimeInMs;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours * priceInHour ;
  };

  const payableAmount = calculatePrice(
    new Date(`1971-01-01T${startTime}:00`),
    new Date(`1971-01-01T${endTime}:00`)
  );


  transformedData.payableAmount = payableAmount;
  transformedData.user = req.user.id;
  transformedData.isBooked = "pending";
  // transformedData.transactionId = `TXN-${Date.now()}`;


  const newBookingData = await bookingService.createBookingIntoDb(
    transformedData
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Booking created successfully",
    data: newBookingData,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const parsedLimit = Number(limit)  
  const parsedPage = Number(page) || 1; 
  const skip = (parsedPage - 1) * parsedLimit; 

  const allBookingData = await bookingService.getAllBookingFromDb({
    skip,
    limit:parsedLimit
  });
  if (allBookingData.length === 0) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: allBookingData,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {

  const { id } = req.params;

  const result = await bookingService.getSingleBookingFromDb(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: [result],
  });
});

const checkAvailability = catchAsync(async (req, res) => {
  let { date } = req.query;


if(typeof date === 'string'){
 const data = [
  {
    startTime: "06:00",
    endTime: "12:00",
    _id:'1'
},
{
    startTime: "14:00",
    endTime: "22:00",
    _id:'2'
}
]
sendResponse(res, {
  success: true,
  statusCode: httpStatus.OK,
  message: "Availability checked successfully",
  data: data,
})
}

  if (typeof date !== "string") {
    date = new Date().toISOString().split("T")[0];
  }

 
});

const viewBookingsByUser = catchAsync(async (req, res) => {
  const {  page = 1, limit = 2 } = req.query;
  const parsedLimit = Number(limit) || 2; 
  const parsedPage = Number(page) || 1; 
  const skip = (parsedPage - 1) * parsedLimit; 
  const { id } = req.params;
  
  const userBookingsData = await bookingService.viewBookingsByUserFromDB({
    id,
    skip,
    limit:parsedLimit
  });

  if (userBookingsData.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: userBookingsData,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const canceledBooking = await bookingService.cancelBookingById(id, userId);

  if (!canceledBooking) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Booking not found or you are not authorized to cancel it",
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings cancel successfully",
    data: canceledBooking,
  });

})

export const bookingController = {
  createBooking,
  getAllBooking,
  checkAvailability,
  viewBookingsByUser,
  cancelBooking,
  getSingleBooking,
  
}