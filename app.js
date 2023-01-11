import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cakes from "./src/routes/cakes.route.js"
import clients from "./src/routes/clients.route.js"
import order from "./src/routes/order.route.js"
import flavours from "./src/routes/flavours.route.js"
import get_orders from "./src/routes/get_orders.route.js"
import get_orders_id from "./src/routes/get_orders_id.route.js"
import get_orders_client from "./src/routes/get_orders_client.route.js"
import delivered from "./src/routes/delivered.route.js"

//config
const app = express()
dotenv.config();
app.use(express.json());
app.use(cors());

//post
app.use(cakes);
app.use(clients);
app.use(order);
app.use(flavours);

//get
app.use(get_orders);
app.use(get_orders_id);
app.use(get_orders_client);

//patch
app.use(delivered);

//connection
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));
