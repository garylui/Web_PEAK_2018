var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("asm");
  dbo.collection("profile").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result.length);
    db.close();
  });
});