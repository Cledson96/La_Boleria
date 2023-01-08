import { Router } from "express";
import {cakes} from "../controllers/cakes.controller.js";


  const router = Router();

  router.post("/cakes", cakes);

  export default router;    