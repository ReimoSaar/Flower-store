import React from 'react'
import FetchData from "../../Tools/FetchData"
import ProductCard from "./ProductCard"
import "../../Style/Products.css"
import getBackendDomainAndPort from "../../Tools/getBackendDomainAndPort"

function Products() {

    let products = FetchData(`https://${getBackendDomainAndPort()}/products`);

    let content = null;
    if (products.data) {
        content =
            products.data.map((product, key) =>
                <ProductCard name={product.name} price={product.price} stock={product.stock} image_url={product.image_url} />
            )
    }

    return (
        <div>
            <h2 id="productsTitle">Products</h2>
            <div id="productList">
                {content}
            </div>
        </div>
    )
}

export default Products