import { Router } from "express";
import {order} from "../controllers/order.controller.js";


  const router = Router();

  router.post("/order", order);

  export default router;    