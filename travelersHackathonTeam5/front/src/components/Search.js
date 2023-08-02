import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import searchItem from '../util/searchItem';
import searchCategory from '../util/searchCategory';
import Product from './product';
import './Search.css'

const Search = ({setNumCartItems, numCartItems}) => {
    const location = useLocation();
    const queryParameters = new URLSearchParams(location.search);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const items = async () => {
            let it = queryParameters.get("item")
            let cat = queryParameters.get("category")
            let response;
            if (it) {
                response = await searchItem(it);
                setSearch(it);
            } else if (cat) {
                response = await searchCategory(cat);
                setSearch(cat);
            }
            if (response?.ok) {
                let parsed = await response.json();
                setItems(parsed);
            } else {
                console.log('error');
            }
        }
        items();
    }, [])

    return (
        <div style={{ paddingTop: "5rem" }} >
            <h1>Search Page</h1>
            <p>Your Search: {search}</p>
            <div className='products'>
                {items.map(
                    (i, index) => <Product className='item' key={index} item={i} numCartItems={numCartItems} setNumCartItems={setNumCartItems}/>
                )}
            </div>
        </div>
    )
}

export default Search;