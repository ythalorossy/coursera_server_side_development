var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// DB operations (It's like C.R.U.D.)
var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
        "dishes", function (result) {
            console.log(result.ops);

            dboper.findDocuments(db, "dishes", function (docs) {
                console.log(docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" },
                    "dishes", function (result) {
                        console.log(result.result);

                        dboper.findDocuments(db, "dishes", function (docs) {
                            console.log(docs)

                            // Cleaning the collection
                            db.dropCollection("dishes", function (result) {
                                console.log(result);

                                // Use close method to disconnect to the DB Server
                                db.close();
                            });
                        });
                    });
            });
        });
});
