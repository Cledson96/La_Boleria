import { connection } from "../database/db.js";
import  flavoursschema  from "../models/flavours.models.js";


export async function flavours(req, res) {

    const validation = flavoursschema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        res.status(400).send(validation.error.message);
        return
    }

    const { name } = req.body

    try {
   
        const { rows } = await connection.query("SELECT * FROM flavours WHERE name=$1;", [name]);

        if (rows.length > 0) {
            res.status(409).send("Já existe um sabor com este nome!");
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }

    try {
        await connection.query("INSERT INTO flavours (name) VALUES ($1);", [name]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}