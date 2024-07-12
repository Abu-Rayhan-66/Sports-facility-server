import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import facilityRoute from '../modules/facilites/facility.route';


const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/facility",
    route: facilityRoute,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
