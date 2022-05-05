const { response } = require('express');
const express = require('express');
const { join } = require('path');
const dbObject = require(join(__dirname,'../db/conn.js'));
const router = express.Router();
 router.route('/items').get(async (req, res) => {
    const dbConnect = dbObject.getDb();
    dbConnect
    .collection('ProductsList').find({}).limit(50)
    .toArray((err, result) => {
        if(err){
            res.status(400).send("Error fetching items");
        }
        else{
            res.json(result);
        }
    });
});

router.route('/orders').post(async (req, res) => {
    const dbConnect = dbObject.getDb();
    const order = {
        order_id: req.orderId,
        items: req.items
    }
    dbConnect
    .collection('Orders')
    .insertOne(order, async (err, response) => {
        if(err){
            res.send({code: 400, reason: err})
        }
        else{
            console.log("Added an order in the db")
            console.log(order)
        }
    })
});
module.exports = router;