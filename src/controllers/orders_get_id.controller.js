import { connection } from "../database/db.js";



export async function orders(req, res) {

    const { id } = req.params
    let orders

    try {
        const { rows } = await connection.query("SELECT * FROM orders WHERE id=$1;", [id])
        orders = rows


    } catch (err) {
        res.status(500).send(err.messsage);
    }

    if (orders && orders.length > 0) {
        let client = await connection.query("SELECT * FROM clients  WHERE ID=$1;", [orders[0].clientid])
        client = client.rows[0]

        let cake = await connection.query("SELECT * FROM cakes  WHERE ID=$1;", [orders[0].cakeid])
        cake = cake.rows[0]

        res.status(200).send({
            orderId: orders[0].id,
            createdAt: orders[0].createdat,
            quantity: orders[0].quantity,
            totalPrice: orders[0].totalPrice,
            client,
            cake
        });

    } else {
        res.sendStatus(404);

    }

}