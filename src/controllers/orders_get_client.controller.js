import { connection } from "../database/db.js";

export async function orders(req, res) {

    const { id } = req.params
    let orders
    const send = []

    try {
        const { rows } = await connection.query("SELECT * FROM orders WHERE clientid=$1;", [id])
        orders = rows


    } catch (err) {
        res.status(500).send(err.messsage);
    }

    if (orders && orders.length > 0) {
        for (let i = 0; i < orders.length; i++) {

            let cake = await connection.query("SELECT cakes.id,cakes.name,cakes.price,cakes.image,cakes.description,flavours.name AS flavor FROM cakes JOIN flavours ON cakes.flavourid = flavours.id WHERE cakes.id=$1;", [orders[i].cakeid])
            cake = cake.rows[0]
         
            send.push(
                {
                    orderId: orders[i].id,
                    quantity: orders[i].quantity,
                    createdAt: orders[i].createdat,
                    totalPrice: orders[i].totalprice,
                    isDelivered:orders[i].isdelivered,
                    cakeName: cake.name,
                    cakeflavor: cake.flavor
                }
            )
        }
        res.status(200).send(send);
    } else {
        res.status(404).send([]);
    }
}