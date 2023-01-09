import { connection } from "../database/db.js";
import  cakeschema  from "../models/cakes.models.js";


export async function cakes(req, res) {

    const validation = cakeschema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        res.status(400).send(validation.error.message);
        return
    }

    const { name, price, image, description } = req.body

    try {
   
        const { rows } = await connection.query("SELECT * FROM cakes WHERE name=$1;", [name]);

        if (rows.length > 0) {
            res.status(409).send("Já existe um bolo com este nome!");
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }

    try {
        await connection.query("INSERT INTO cakes (name,price,image,description) VALUES ($1, $2, $3,$4);", [name, price, image,description]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}