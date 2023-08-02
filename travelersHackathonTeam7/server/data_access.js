const mongodb = require("mongodb"); // mongo client library
const url = "mongodb://localhost:27017/storedb";
let dbPool;

mongodb.MongoClient.connect(url, function (err, db) {
  if (!err) {
    dbPool = db.db("storedb");
  } else {
    console.log("DB CONNECTION FAILED. Is database running?");
  }
});

module.exports.find100Products = async function (callback) {
    var col = dbPool.collection("products");
    col.find().limit(100).toArray(async(err, products) => {
      if (!err) {
        callback(null, products);
      } else {
        callback("Failed to find products", undefined);
      }
    });
  };

  module.exports.findCategory = async function (category, callback) {
    var col = dbPool.collection("products");
    col.find({ amazon_category_and_sub_category: category }).toArray(async(err, products) => {
      if (!err) {
        callback(null, products);
      } else {
        callback("Failed to find products", undefined);
      }
    });
  };

  module.exports.findProduct = async function (id, callback) {
    var col = dbPool.collection("products");
    col.find({ unique_values: id }).toArray(async(err, products) => {
      if (!err) {
        callback(null, products);
      } else {
        callback("Failed to find product", undefined);
      }
    });
  };

  module.exports.search = async function (query, callback) {
    var col = dbPool.collection("products");
    col.find({ $or:[{product_name : {$regex : query, $options : 'i'}}, {description : {$regex : query, $options : 'i'}}] }).toArray(async(err, products) => {
      if (!err) {
        callback(null, products);
      } else {
        callback("Failed to find products", undefined);
      }
    });
  };

  module.exports.getCart = async function (callback) {
    var col = dbPool.collection("cart");
    col.find().toArray(async(err, products) => {
      if (!err) {
        callback(null, products);
      } else {
        callback("Failed to find products", undefined);
      }
    });
  };

  module.exports.addProduct = function(body) {
    var col = dbPool.collection("cart");
    col.insertOne(body);
  };

  module.exports.removeProduct = function(id){
    var col = dbPool.collection("cart");
    col.deleteOne( { "unique_values" : id } );
  };

  module.exports.newOrder = function(body) {
    var col = dbPool.collection("orders");
    col.insertOne(body);
    dbPool.collection("cart").drop();
  };

  module.exports.findFeaturedProducts = async function (callback) {
    var col = dbPool.collection("products");
    col.aggregate([{ $sample: { size: 8 } }]).toArray(async(err, products) => {
      if (!err) {
        callback(null, products);
      } else {
        callback("Failed to find products", undefined);
      }
    });
  };