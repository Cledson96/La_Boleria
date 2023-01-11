import { Router } from "express";
import {orders} from "../controllers/orders_get_client.controller.js";


  const router = Router();

  router.get("/clients/:id/orders", orders);

  export default router;    