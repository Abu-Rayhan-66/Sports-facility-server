import { Types } from "mongoose";

export type TBooking = {
    date: Date;
    startTime: Date;
    endTime: Date;
    user: Types.ObjectId;
    facility: Types.ObjectId;
    payableAmount: number;
    priceInHour:number
    booking: Types.ObjectId;
    transactionId: string;
    isBooked: string;
}