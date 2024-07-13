import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import facilityRoute from '../modules/facilites/facility.route';
import bookingRoute from '../modules/booking/booking.route';



const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/facility",
    route: facilityRoute,
  },
  {
    path: "/",
    route: bookingRoute,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
