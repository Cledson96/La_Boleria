import { connection } from "../database/db.js";
import orderschema from "../models/order.models.js";


export async function order(req, res) {

    const validation = orderschema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        res.status(400).send(validation.error.message);
        return
    }

    const { clientId, cakeId, quantity, totalPrice } = req.body

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
        res.status(400)
        return
    }

    try {

        const { rows } = await connection.query("SELECT * FROM clients WHERE id=$1;", [clientId]);

        if (rows.length < 1) {
            res.status(404).send("Id do usuario inexistente!");
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }

    try {

        const { rows } = await connection.query("SELECT * FROM cakes WHERE id=$1;", [cakeId]);

        if (rows.length < 1) {
            res.status(404).send("Id do bolo inexistente!");
            return
        }

    } catch (err) {
        res.status(500).send(err.message);
    }

    try {

        await connection.query("INSERT INTO orders (clientId,cakeId,quantity,totalPrice) VALUES ($1, $2, $3,$4);", [clientId, cakeId, quantity, totalPrice]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}