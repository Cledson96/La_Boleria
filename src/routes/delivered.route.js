
import { Router } from "express";
import {delivered} from "../controllers/delivered.controller.js";


  const router = Router();

  router.patch("/order/:id", delivered);

  export default router;    