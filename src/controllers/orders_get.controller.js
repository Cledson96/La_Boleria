import { connection } from "../database/db.js";

export async function orders(req, res) {
    const data = req.query.data;
    let orders
    let send = []
    if (data) {
        try {
            const { rows } = await connection.query("SELECT * FROM orders WHERE createdAt=$1;"[data])
            orders = rows

        } catch (err) {
            res.status(500).send(err.messsage);
        }
    }else{
        try {
            const { rows } = await connection.query("SELECT * FROM orders ;")
            orders = rows

        } catch (err) {
            res.status(500).send(err.messsage);
        }
    }

    for (let i = 0; i < orders.length; i++) {
        let client = await connection.query("SELECT * FROM clients  WHERE ID=$1;", [orders[i].clientid])
        client = client.rows[0]

        let cake = await connection.query("SELECT * FROM cakes  WHERE ID=$1;", [orders[i].cakeid])
        cake = cake.rows[0]


        send.push(
            {
                orderId: orders[i].id,
                createdAt: orders[i].createdat,
                quantity: orders[i].quantity,
                totalPrice: orders[i].totalPrice,
                client,
                cake
            }
        )
    }
    res.status(200).send(send);
}