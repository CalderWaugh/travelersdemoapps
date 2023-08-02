import React, {useState, useEffect, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function Cards(){
    let [featuredList, setFeaturedList] = useState([]);
    
    let data_url = "http://localhost:4000/api/featuredProducts";

    const fetchProducts = () => {
        fetch(data_url)
        .then((res) => res.json())
        .then((featuredList) => {
            setFeaturedList(featuredList)
        });
    };

    function handleClick(id) {
        window.location='http://localhost:3000/product?id='+id;
    };
    
    useEffect(fetchProducts, []);

    if(featuredList.length==0){
        return
    }

    if(featuredList.length!=0){
        return(
            <section>
                <div class="container my-5">
                    <header class="mb-4">
                    <h3>Featured Products</h3>
                    </header>
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-6 d-flex"> 
                            <div class="card text-center my-2 shadow-2-strong">
                                <div class="card-body">
                                    <h5 class="card-title">{featuredList[0].product_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{featuredList[0].price==-1?"":"$"+featuredList[0].price}</h6>
                                    <p class="card-text">{featuredList[0].description.length>100?featuredList[0].description.substring(0,100)+"...":featuredList[0].description}</p>
                                    <a href="#" class="btn btn-primary" onClick={() => handleClick(featuredList[0].unique_values)}>View Item</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 d-flex"> 
                            <div class="card text-center my-2 shadow-2-strong">
                                <div class="card-body">
                                    <h5 class="card-title">{featuredList[1].product_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{featuredList[1].price==-1?"":"$"+featuredList[1].price}</h6>
                                    <p class="card-text">{featuredList[1].description.length>100?featuredList[1].description.substring(0,100)+"...":featuredList[1].description}</p>
                                    <a href="#" class="btn btn-primary" onClick={() => handleClick(featuredList[1].unique_values)}>View Item</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 d-flex"> 
                            <div class="card text-center my-2 shadow-2-strong">
                                <div class="card-body">
                                    <h5 class="card-title">{featuredList[2].product_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{featuredList[2].price==-1?"":"$"+featuredList[2].price}</h6>
                                    <p class="card-text">{featuredList[2].description.length>100?featuredList[2].description.substring(0,100)+"...":featuredList[2].description}</p>
                                    <a href="#" class="btn btn-primary" onClick={() => handleClick(featuredList[2].unique_values)}>View Item</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 d-flex"> 
                            <div class="card text-center my-2 shadow-2-strong">
                                <div class="card-body">
                                    <h5 class="card-title">{featuredList[3].product_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{featuredList[3].price==-1?"":"$"+featuredList[3].price}</h6>
                                    <p class="card-text">{featuredList[3].description.length>100?featuredList[3].description.substring(0,100)+"...":featuredList[3].description}</p>
                                    <a href="#" class="btn btn-primary" onClick={() => handleClick(featuredList[3].unique_values)}>View Item</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 d-flex"> 
                            <div class="card text-center my-2 shadow-2-strong">
                                <div class="card-body">
                                    <h5 class="card-title">{featuredList[4].product_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{featuredList[4].price==-1?"":"$"+featuredList[4].price}</h6>
                                    <p class="card-text">{featuredList[4].description.length>100?featuredList[4].description.substring(0,100)+"...":featuredList[4].description}</p>
                                    <a href="#" class="btn btn-primary" onClick={() => handleClick(featuredList[4].unique_values)}>View Item</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 d-flex"> 
                            <div class="card text-center my-2 shadow-2-strong">
                                <div class="card-body">
                                    <h5 class="card-title">{featuredList[5].product_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{featuredList[5].price==-1?"":"$"+featuredList[5].price}</h6>
                                    <p class="card-text">{featuredList[5].description.length>100?featuredList[5].description.substring(0,100)+"...":featuredList[5].description}</p>
                                    <a href="#" class="btn btn-primary" onClick={() => handleClick(featuredList[5].unique_values)}>View Item</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 d-flex"> 
                            <div class="card text-center my-2 shadow-2-strong">
                                <div class="card-body">
                                    <h5 class="card-title">{featuredList[6].product_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{featuredList[6].price==-1?"":"$"+featuredList[6].price}</h6>
                                    <p class="card-text">{featuredList[6].description.length>100?featuredList[6].description.substring(0,100)+"...":featuredList[6].description}</p>
                                    <a href="#" class="btn btn-primary" onClick={() => handleClick(featuredList[6].unique_values)}>View Item</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 d-flex"> 
                            <div class="card text-center my-2 shadow-2-strong">
                                <div class="card-body">
                                    <h5 class="card-title">{featuredList[7].product_name}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">{featuredList[7].price==-1?"":"$"+featuredList[7].price}</h6>
                                    <p class="card-text">{featuredList[7].description.length>100?featuredList[7].description.substring(0,100)+"...":featuredList[7].description}</p>
                                    <a href="#" class="btn btn-primary" onClick={() => handleClick(featuredList[7].unique_values)}>View Item</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Cards;