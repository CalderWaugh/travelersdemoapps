import React, {useState, useEffect} from 'react'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function Checkoutpage(){
    let [cartList, setCartList] = useState([]);

    let checkout_url = "http://localhost:4000/api/checkout";
    let cart_url = "http://localhost:4000/api/cart/getCart";

    const putOrder = (data) => {
        fetch(checkout_url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    };

    const fetchCart = () => {
        fetch(cart_url)
        .then((res) => res.json())
        .then((cartList) => {
            setCartList(cartList);
        });
    };

    function handleClick() {
        putOrder({
            "first_name": document.getElementById("firstName").value,
            "last_name": document.getElementById("lastName").value,
            "email": document.getElementById("email").value,
            "address": document.getElementById("address").value,
            "address_2": document.getElementById("address2").value,
            "country": document.getElementById("country").value,
            "state": document.getElementById("state").value,
            "zip": document.getElementById("zip").value,
            "name_on_card": document.getElementById("cc-name").value,
            "cc_number": document.getElementById("cc-number").value,
            "expiration": document.getElementById("cc-expiration").value,
            "cvv": document.getElementById("cc-cvv").value,
            "amount_owed": cartList.map(amount).reduce(sum),
            "order": cartList
        });
        window.location='http://localhost:3000/';
        alert("Thank you, Your order has been submitted!")
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
                <p>Nothing in your cart!</p>
            </div>
        )
    };

    if(cartList.length!=0){
        return(
            <div class="container">
                <Navbar></Navbar>
                <div class="py-5 text-center">
                    
                    <h2>Complete your order!</h2>
                    <p class="lead">Let this toy and me turn this into Toys R Us!</p>
                </div>

                <div class="row">
                    <div class="col-md-4 order-md-2 mb-4">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-muted">Your cart</span>
                        <span class="badge badge-secondary badge-pill">3</span>
                    </h4>
                    <ul class="list-group mb-3">
                        {cartList.map((product) => (
                                <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 class="my-0">{product.product_name}</h6>
                                        <small class="text-muted">{product.description.length>100?product.description.substring(0,100)+"...":product.description}</small>
                                    </div>
                                    <span class="text-muted">${product.price}</span>
                                </li>
                            ))}
                        <li class="list-group-item d-flex justify-content-between">
                        <span>Total (USD)</span>
                        <strong>${cartList.map(amount).reduce(sum)}</strong>
                        </li>
                    </ul>
                    </div>
                    <div class="col-md-8 order-md-1">
                    <h4 class="mb-3">Shipping address</h4>
                    <form class="needs-validation" novalidate>
                        <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="firstName">First name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="" required></input>
                            <div class="invalid-feedback">
                            Valid first name is required.
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="lastName">Last name</label>
                            <input type="text" class="form-control" id="lastName" placeholder="" required></input>
                            <div class="invalid-feedback">
                            Valid last name is required.
                            </div>
                        </div>
                        </div>

                        <div class="mb-3">
                        <label for="email">Email <span class="text-muted">(Optional)</span></label>
                        <input type="email" class="form-control" id="email" placeholder="you@example.com"></input>
                        <div class="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                        </div>
                        </div>

                        <div class="mb-3">
                        <label for="address">Address</label>
                        <input type="text" class="form-control" id="address" placeholder="1234 Main St" required></input>
                        <div class="invalid-feedback">
                            Please enter your shipping address.
                        </div>
                        </div>

                        <div class="mb-3">
                        <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                        <input type="text" class="form-control" id="address2" placeholder="Apartment or suite"></input>
                        </div>

                        <div class="row">
                        <div class="col-md-5 mb-3">
                            <label for="country">Country</label>
                            <input type="text" class="form-control" id="country" placeholder="ex. United States"></input>
                            <div class="invalid-feedback">
                            Please provide a valid country.
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="state">State</label>
                            <input type="text" class="form-control" id="state" placeholder="ex. Connecticut"></input>
                            <div class="invalid-feedback">
                            Please provide a valid state.
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="zip">Zip</label>
                            <input type="text" class="form-control" id="zip" placeholder="" required></input>
                            <div class="invalid-feedback">
                            Zip code required.
                            </div>
                        </div>
                        </div>
                        
                        <hr class="mb-4"></hr>

                        <h4 class="mb-3">Payment</h4>

                        <div class="d-block my-3">
                        <div class="custom-control custom-radio">
                            <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required></input>
                            <label class="custom-control-label" for="credit">Credit card</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required></input>
                            <label class="custom-control-label" for="debit">Debit card</label>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="cc-name">Name on card</label>
                            <input type="text" class="form-control" id="cc-name" placeholder="" required></input>
                            <small class="text-muted">Full name as displayed on card</small>
                            <div class="invalid-feedback">
                            Name on card is required
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="cc-number">Credit card number</label>
                            <input type="text" class="form-control" id="cc-number" placeholder="" required></input>
                            <div class="invalid-feedback">
                            Credit card number is required
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-md-3 mb-3">
                            <label for="cc-expiration">Expiration</label>
                            <input type="text" class="form-control" id="cc-expiration" placeholder="" required></input>
                            <div class="invalid-feedback">
                            Expiration date required
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="cc-cvv">CVV</label>
                            <input type="text" class="form-control" id="cc-cvv" placeholder="" required></input>
                            <div class="invalid-feedback">
                            Security code required
                            </div>
                        </div>
                        </div>
                        <hr class="mb-4"></hr>
                        <button class="btn btn-primary btn-lg btn-block" onClick={() => handleClick()}>Checkout</button>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkoutpage;