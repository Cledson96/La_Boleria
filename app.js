import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cakes from "./src/routes/cakes.route.js"
import clients from "./src/routes/clients.route.js"
import order from "./src/routes/order.route.js"
import get_orders from "./src/routes/get_orders.route.js"

//config
const app = express()
dotenv.config();
app.use(express.json());
app.use(cors());

//post
app.use(cakes);
app.use(clients);
app.use(order);

//get
app.use(get_orders);

//connection
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));