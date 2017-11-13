var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/quiz2";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.createCollection("users", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        // db.close();
    });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = { name: "Company Inc", address: "Highway 37" };

  var myobj = [{
    id: 1,
    first_name: "BOREY",
    last_name: "SOK",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  },
  {
    id: 2,
    first_name: "B2",
    last_name: "S2",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  },
  {
    id: 3,
    first_name: "B3",
    last_name: "S3",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  },
  {
    id: 4,
    first_name: "B4",
    last_name: "S4",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  },
  {
    id: 5,
    first_name: "B5",
    last_name: "S5",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  },
  {
    id: 6,
    first_name: "B6",
    last_name: "S6",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  },
  {
    id: 7,
    first_name: "B7",
    last_name: "S7",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  },
  {
    id: 8,
    first_name: "B8",
    last_name: "S8",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  },
  {
    id: 9,
    first_name: "B9",
    last_name: "S9",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  },
  {
    id: 10,
    first_name: "B10",
    last_name: "S10",
    register_date:"11/11/2017",
    country:"KH",
    role:"user"
  }
];

  db.collection("users").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});