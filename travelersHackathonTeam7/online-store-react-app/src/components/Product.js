import React, {useState, useEffect} from 'react'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function Product(){
    let [productList, setProductList] = useState([]);

    let getProduct_url = "http://localhost:4000/api/findProduct/";
    let addProduct_url = "http://localhost:4000/api/cart/addProduct";

    const fetchProduct = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
    
        fetch(getProduct_url+urlParams.get('id'))
        .then((res) => res.json())
        .then((productList) => {
            setProductList(productList);
        });
    };

    const addProduct = (data) => {
        fetch(addProduct_url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    };

    function handleClick(data) {
        addProduct(data);
        window.location='http://localhost:3000/';
        alert("Your item has been added to the cart!");
    };

    useEffect(fetchProduct, []);

    if(productList.length==0){
        return
    }

    if(productList.length!=0){
        return(
            <div class="container">
                <Navbar/>
                <div class="row gy-5 mt-0">
                    <div class="col">
                        <p class="productpage text-left">{productList[0].amazon_category_and_sub_category}</p>
                        <h2>{productList[0].product_name}</h2>
                        <p>Average Rating: {productList[0].average_review_rating}</p>
                        <body>
                            Product description: {productList[0].description}
                        </body>
                    </div>
                    
                    <div class="col d-flex justify-content-center">
                        <div class="card text-center mb-3">
                            <div class="card-body">
                                <p class="card-text p-3"></p>
                                <h2 class="card-text p-4">Price:</h2>
                                <h2 class="card-text p-4">${productList[0].price}</h2>
                                <p class="card-text p-3"></p>
                                <a href="#" class="btn btn-primary mt-5" onClick={() => handleClick(productList[0])}>Add to Cart</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="w-100 border-top"></div>

                    <div class="row mt-3">
                        <h4 class="text-right">Customer Reviews</h4>
                        <p>{productList[0].customer_reviews}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;