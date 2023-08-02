import React, {useState, useEffect} from 'react'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function Cart(){
    let [cartList, setCartList] = useState([]);

    let cart_url = "http://localhost:4000/api/cart/getCart";
    let remove_url = "http://localhost:4000/api/cart/removeProduct/";

    const fetchCart = () => {
        fetch(cart_url)
        .then((res) => res.json())
        .then((cartList) => {
            setCartList(cartList);
        });
    };

    const deleteProduct = (id) => {
        fetch(remove_url+String(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        })
    };

    function handleClick(id) {
        deleteProduct(id);
        window.location.reload(false);
    };

    function amount(item){
        return item.price;
      }
      
    function sum(prev, next){
        return prev + next;
    }

    useEffect(fetchCart, []);

    if(cartList.length==0){
        return(
            <div>
                <Navbar></Navbar>
                <h3 class="text-center mt-5">Nothing in your cart!</h3>
            </div>
        )
    };

    if(cartList.length!=0){
        return(
            <section >
                <Navbar></Navbar>
                <div class="container">
                    <div class="row w-100">
                        <div class="col-lg-12 col-md-12 col-12">
                            <h3 class="display-5 mb-2 text-center p-4">Shopping Cart</h3>
                            <p class="mb-5 text-center">
                                <i class="text-info font-weight-bold">{cartList.length}</i> items in your cart</p>
                            <table id="shoppingCart" class="table table-condensed table-responsive">
                                <thead>
                                    <tr>
                                        <th id="tableheaderproduct">Product</th>
                                        <th id="tableheaderprice">Price</th>
                                        {/* <th id="tableheaderquantity ">Quantity</th> */}
                                        <th id="tableheader" ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartList.map((product) => (
                                        <tr>
                                            <td data-th="Product">
                                                <div class="row">
                                                    <div class="col-md-9 text-left mt-sm-2">
                                                        <h4>{product.product_name}</h4>
                                                        <p class="font-weight-light">{product.manufacturer}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-th="Price">${product.price}</td>
                                            {/* <td data-th="Quantity">
                                                <input type="number" class="form-control text-center" value="1"></input>
                                            </td> */}
                                            <td class="actions" data-th="">
                                                <div class="text-right">
                                                    <button class="btn btn-white border-secondary bg-white btn-md mb-2" onClick={() => handleClick(product.unique_values)}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))} 
                                </tbody>
                            </table>
                            <div id="total" class="float text-align-center">
                                <h4>Subtotal:</h4>
                                <h1>${cartList.map(amount).reduce(sum)}</h1>
                                <a href="/checkout" class="btn btn-primary mb-4 btn-lg pl-5 pr-5">Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
        );
    }
}

export default Cart;