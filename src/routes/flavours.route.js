import { Router } from "express";
import {flavours} from "../controllers/flavours.controller.js";


  const router = Router();

  router.post("/flavours", flavours);

  export default router;    