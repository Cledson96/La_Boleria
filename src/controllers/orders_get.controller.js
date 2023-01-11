import { connection } from "../database/db.js";
import moment from "moment";

export async function orders(req, res) {
    const data = req.query.date;
    const datanext = moment(data).add(1, 'day')

    let orders
    let send = []
    if (data) {
        try {

            const { rows } = await connection.query(`SELECT * FROM orders WHERE createdat >=  $1 AND createdat <  $2;`, [data,datanext])
            orders = rows


        } catch (err) {
            res.status(500).send(err.messsage);
        }
    } else {
        try {
            const { rows } = await connection.query("SELECT * FROM orders ;")
            orders = rows

        } catch (err) {
            res.status(500).send(err.messsage);
        }
    }
    if (orders && orders.length > 0) {
        for (let i = 0; i < orders.length; i++) {
            let client = await connection.query("SELECT * FROM clients  WHERE ID=$1;", [orders[i].clientid])
            client = client.rows[0]

            let cake = await connection.query("SELECT cakes.id,cakes.name,cakes.price,cakes.image,cakes.description,flavours.name AS flavor FROM cakes JOIN flavours ON cakes.flavourid = flavours.id WHERE cakes.id=$1;", [orders[i].cakeid])
            cake = cake.rows[0]
                   
            send.push(
                {
                    orderId: orders[i].id,
                    createdAt: orders[i].createdat,
                    quantity: orders[i].quantity,
                    totalPrice: orders[i].totalPrice,
                    isDelivered:orders[i].isdelivered,
                    client,
                    cake
                }
            )
        }
        res.status(200).send(send);
    } else {
        res.status(404).send([]);
    }

}