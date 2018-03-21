var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("asm");
  var myobj = {lastName:"example",firstName:"example",account:"example@example.com",password:"example",id:"000001",state:"pass"}
  dbo.collection("profile").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});