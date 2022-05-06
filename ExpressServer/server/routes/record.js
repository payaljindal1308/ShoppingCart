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

router.route('/addorders').post(async (req, res) => {
    const dbConnect = dbObject.getDb();
    const order = {
        items: req.body.items,
        total: req.body.total
    }
    if(!req.body.items){
        res.send({code: 400, message: "Bad request"})
    }
    else{
        dbConnect
        .collection('Orders')
        .insertOne(order, async (err, response) => {
        if(err){
            res.send({code: 400, reason: err})
        }
        else{
           res.send({code: 200, message: "successfully added"})
        }
    })
    }
    
});


router.route('/orders').get(async (req, res) => {
    const dbConnect = dbObject.getDb();
    dbConnect
    .collection('Orders').find({}).limit(50)
    .toArray((err, result) => {
        if(err){
            res.status(400).send("Error fetching items");
        }
        else{
            res.json(result);
        }
    });
});


// router.route('/cartItems').get(async (req, res) => {
//     const dbConnect = dbObject.getDb();
//     dbConnect
//     .collection('Cart').find({}).limit(50)
//     .toArray((err, result) => {
//         if(err){
//             res.status(400).send("Error fetching items");
//         }
//         else{
//             res.json(result);
//         }
//     });
// });


// router.route('/addtocart').post(async (req, res) => {
//     const dbConnect = dbObject.getDb();
//     const order = {
//         order_id: req.orderId,
//         items: req.items
//     }
//     dbConnect
//     .collection('Cart')
//     .insertOne(order, async (err, response) => {
//         if(err){
//             res.send({code: 400, reason: err})
//         }
//         else{
//             console.log("Added an item in the  cart")
//             console.log(order)
//         }
//     })
// });



module.exports = router;


