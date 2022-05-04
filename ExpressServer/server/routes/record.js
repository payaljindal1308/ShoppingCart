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

module.exports = router;