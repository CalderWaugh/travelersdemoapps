import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AddToCart from "./AddToCart.js"

export default function Product({ item , numCartItems, setNumCartItems} ) {
  return (
    <div>
    <Card style={{ width: "18rem", height: "10rem" }}>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{`Price: $${item.price.$numberDecimal}`}</Card.Text>
        <AddToCart item={item} numCartItems={numCartItems} setNumCartItems={setNumCartItems}/>
      </Card.Body>
    </Card>
    </div>
  );
}
