import { connection } from "../database/db.js";

export async function delivered(req, res) {

    const { id } = req.params
    let orders

    try {
        const { rows } = await connection.query("SELECT * FROM orders WHERE id=$1;", [id])
        orders = rows


    } catch (err) {
        res.status(500).send(err.messsage);
    }

    if (orders && orders.length > 0) {
        if (orders[0].isdelivered === true) {
            res.sendStatus(400)
            return
        }
        try {
            await connection.query("UPDATE orders SET isdelivered='true' WHERE id = $1;",[id])
            res.sendStatus(204);
            return
        } catch (err) {
            res.status(500).send(err.messsage);
        }
        
    } else {
        res.sendStatus(404);
        return
    }

}