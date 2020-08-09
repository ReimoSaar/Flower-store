import React from 'react'
import { useParams } from 'react-router-dom'
import FetchData from '../Tools/FetchData'
import "../Style/Components/Product.scss"
import ProductCard from "./Products/ProductCard"
import getBackendDomainAndPort from "../Tools/getBackendDomainAndPort"
import CartButton from "./CartButton"

function Product() {
    const { name } = useParams()

    let content = null
    let relatedProductsContent = null;
    let product = FetchData(`https://${getBackendDomainAndPort()}/products/get/${name}`)
    let relatedProducts = FetchData(`https://${getBackendDomainAndPort()}/products/related/${name}`)

    if (relatedProducts.data) {
        relatedProductsContent =
            relatedProducts.data.map((product, key) =>
                <ProductCard key={product.name} name={product.name} price={product.price} stock={product.stock} image_url={product.image_url} />
            )
    }

    if (product.data) {
        content = <div>
            <div className="product">
                <img className="product__image" alt="" src={product.data.image_url} />
                <div className="product__description-box">
                    <h2 className="product__name">{product.data.name}</h2>
                    <p className="product__price">{product.data.price.toFixed(2)} €</p>
                    <p className="product__stock">{product.data.stock} is left</p>
                    <CartButton productName={name}/>
                </div>
            </div>
            <h3 className="product__products-list-title">Top 3 products that people have bought with it</h3>
            <div className="product__products-list">
                {relatedProductsContent}
            </div>
        </div>
    }
    return (
        <div>{content}</div>
    )
}

export default Product