import express from "express"
import cors from "cors"
dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));