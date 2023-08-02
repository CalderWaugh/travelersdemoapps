const CORS = require('cors')
const express = require('express');
const dao = require('./data_access');

const app = express();

app.use(express.json());
app.use(CORS())

app.get("/api/100products", (req, res) => {
    dao.find100Products((err, products) => {
      if (products) {
        res.send(products);
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  });

  app.get("/api/findProduct/:id", (req, res) => {
    dao.findProduct(req.params.id, (err, products) => {
      if (products) {
        res.send(products);
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  });

  app.get("/api/products/:category", (req, res) => {
    dao.findCategory(req.params.category, (err, products) => {
      if (products) {
        res.send(products);
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  });

  app.get("/api/products/search/:query", (req, res) => {
    dao.search(req.params.query, (err, products) => {
      if (products) {
        res.send(products);
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  });
  
  app.get("/api/cart/getCart", (req, res) => {
    dao.getCart((err, products) => {
      if (products) {
        res.send(products);
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  });

  app.put("/api/cart/addProduct", (req,res) => {
    if(req.body === undefined){
        res.statusCode = 500;
        res.end();
        return;
    }
    dao.addProduct(req.body);
    res.end()
  });

  app.put("/api/cart/removeProduct/:id", (req,res) => {
    if(req.params.id === undefined){
        res.statusCode = 500;
        res.end();
        return;
    }
    dao.removeProduct(req.params.id);
    res.end()
  });

  app.put("/api/checkout", (req,res) => {
    if(req.body === undefined){
        res.statusCode = 500;
        res.end();
        return;
    }
    dao.newOrder(req.body);
    res.end();
  });

  app.get("/api/featuredProducts", (req, res) => {
    dao.findFeaturedProducts((err, products) => {
      if (products) {
        res.send(products);
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  });

const port = 4000;
console.log(
  "Open a browser to http://localhost:" + port + " to view the application"
);
app.listen(port);