import { Router } from "express";
import {orders} from "../controllers/orders_get.controller.js";


  const router = Router();

  router.get("/orders", orders);

  export default router;    