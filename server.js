// var express = require('express');
var exp = require('express');
var app = exp(); //constructor

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/quiz2";

app.get('/users', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").find({}).toArray(function (err, result) {
            if (err) throw err;
            //   console.log(result);
            res.send(result);
            //   res.render(result);
            // result;
            //   db.close();
        });
    });
});

app.get('/users/search', function (req, res) {
    var user_fname = req.query.fname;
    console.log(user_fname);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var query = { first_name:user_fname };
        db.collection("users").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            // db.close();
        });
    });

});

app.get('/users/role/:role', function (req, res) {
    var searhrole = req.params.role;
    console.log(searhrole);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var query = { role:searhrole};
        db.collection("users").find(query).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
            // db.close();
        });
    });

});

app.listen(3000);