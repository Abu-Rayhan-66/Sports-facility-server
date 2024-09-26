import { z } from 'zod';

export const createBookingSchema = z.object({
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
  startTime: z
    .string()
    .refine((val) => /^\d{2}:\d{2}$/.test(val), {
      message: "Invalid start time format",
    })
    .transform((val) => {
      const [hours, minutes] = val.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    }),
  endTime: z
    .string()
    .refine((val) => /^\d{2}:\d{2}$/.test(val), {
      message: "Invalid end time format",
    })
    .transform((val) => {
      const [hours, minutes] = val.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    }),
  facility: z.string(),
  user: z.string().optional(),
  payableAmount: z.number().optional(),
  priceInHour: z.number().optional(),
  // booking: z.string().optional(),
  transactionId:z.string(),
  isBooked:z.string().optional()

});