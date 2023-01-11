import { Router } from "express";
import {orders} from "../controllers/orders_get_id.controller.js";


  const router = Router();

  router.get("/orders/:id", orders);

  export default router;    