import React from 'react'
import FetchData from "../../Tools/FetchData"
import ProductCard from "./ProductCard"
import "../../Style/Components/Products.scss"
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
            <h2 className="products-title">Products</h2>
            <div className="product-list">
                {content}
            </div>
        </div>
    )
}

export default Products