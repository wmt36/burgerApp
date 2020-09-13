const express = require('express');

const router = express.Router();

const burger = require('../models/burger.js');

//making a connection to the main html page for a solid connection

router.get('/', function(req, res) {
    burger.all(function(data) {
        let hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render('index', hbsObj);
    });
});


//allowing the usser the ablity to create new burgers by adding them tot he database
router.post('/api/burgers', function(req, res) {
    burger.create([
        'name', 'devoured'
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        //giving each indiviudal burger an ID
        res.json({id: res.insertId})
    });
});


//allowwing the user the ability to update code with specific id linked to specific burger
//allso allows makingt he compute understand if no rows were edited then the opbject musnt exist
router.put('/api/burgers/:id', function(req, res) {
    let condition = 'id'+ req.params.id;
    burger.update({
        devoured: req.body.devoured
    }, condition,function(result) {
        if(result.changedRows === 0){
        return res.status(400).end();
    } else {
        res.status(200).end();
    }
    });
});


//setting up the delet function to all the user to delete seleted objects
router.delete('/api/burgers/:id', function (req, res) {
    let condition = id + req.params.id;
    router.delete(condition, function(result) {
        if(results.rowsChanged == 0){
            return res.status(404).end()
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;
