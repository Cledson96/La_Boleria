import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cakes from "./src/routes/cakes.route.js"
import clients from "./src/routes/clients.route.js"
import order from "./src/routes/order.route.js"

const app = express()
dotenv.config();
app.use(express.json());
app.use(cors());


app.use(cakes);
app.use(clients);
app.use(order);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));