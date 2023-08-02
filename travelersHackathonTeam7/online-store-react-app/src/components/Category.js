import React, {useState, useEffect, useMemo} from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function Category(){
    let [productList, setProductList] = useState([]);

    let data_url = "http://localhost:4000/api/products/";

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const fetchProducts = () => {
    
        fetch(data_url+urlParams.get('category'))
        .then((res) => res.json())
        .then((productList) => {
            setProductList(productList)
        });
    };

    function handleClick(id) {
        window.location='http://localhost:3000/product?id='+id;
    };

    useEffect(fetchProducts, []);

    if(productList.length==0){
        return(
            <section>
                <Navbar/>
                <p>loading...</p>
            </section>
        )
    }

    if(productList.length!=0){
        return(
            <section>
                <Navbar/>
                    <div class="container my-5">
                        <header class="mb-4">
                        <h3>Category: "{urlParams.get('category')}"</h3>
                        </header>
                        <div class="row">
                        {productList.map((product) => (
                                            <div class="col-lg-3 col-md-6 col-sm-6 d-flex"> 
                                                <div class="card text-center my-2 shadow-2-strong">
                                                    <div class="card-body">
                                                        <h5 class="card-title">{product.product_name}</h5>
                                                        <h6 class="card-subtitle mb-2 text-muted">{product.price==-1?"":"$"+product.price}</h6>
                                                        <p class="card-text">{product.description.length>100?product.description.substring(0,100)+"...":product.description}</p>
                                                        <a href="#" class="btn btn-primary" onClick={() => handleClick(product.unique_values)}>View Item</a>
                                                    </div>
                                                </div>
                                            </div>             
                                        ))}
                        </div>
                    </div>
                </section>
        );
    }
}

export default Category;