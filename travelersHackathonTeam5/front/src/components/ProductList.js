import React, { useState, useEffect } from "react";
import Product from "./product.js";

export default function ProductList({ items,setCartItems }) {
  console.log("iii", items)
  return (
    <div>
    {items.map((i,index) =><Product key={index} item={i} />
      )}
    </div>
  );
}
