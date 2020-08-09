import React, { useState, useEffect } from 'react'
import ProductCard from "./ProductCard"
import "../../Style/Components/Products.scss"
import getBackendDomainAndPort from "../../Tools/getBackendDomainAndPort"
import FilterBox from "./FilterBox"
import axios from 'axios';

function Products() {

    const [products, setProducts] = useState(null)

    const changeProducts = (condition) => {
        axios.get(`https://${getBackendDomainAndPort()}/products/${condition}`)
            .then(response => {
                setProducts(response.data)})
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        changeProducts('mostpopular')
    }, [])

    let content = null;
    if (products) {
        content =
            products.map((product, key) =>
                <ProductCard key={product.name} name={product.name} price={product.price} stock={product.stock} image_url={product.image_url} />
            )
    }

    return (
        <div className="products">
            <h2 className="products__title">Products</h2>
            <FilterBox changeProducts={changeProducts}/>
            <div className="products__list">
                {content}
            </div>
        </div>
    )
}

export default Products