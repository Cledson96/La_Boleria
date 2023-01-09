import { connection } from "../database/db.js";
import  clientsschema  from "../models/clients.models.js";


export async function clients(req, res) {

    const validation = clientsschema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        res.status(400).send(validation.error.message);
        return
    }

    const { name, address, phone } = req.body

    try {
   
        const { rows } = await connection.query("SELECT * FROM clients WHERE name=$1;", [name]);

        if (rows.length > 0) {
            res.status(409).send("Já existe um cliente com este nome!");
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }

    try {
        await connection.query("INSERT INTO clients (name,address,phone) VALUES ($1, $2, $3);", [name, address, phone]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}