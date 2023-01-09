import { Router } from "express";
import {clients} from "../controllers/clients.controller.js";


  const router = Router();

  router.post("/clients", clients);

  export default router;    