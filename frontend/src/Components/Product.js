import React from 'react'
import { useParams } from 'react-router-dom'
import FetchData from '../Tools/FetchData'
import "../Style/Product.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import ProductCard from "./Home/ProductCard"
import axios from 'axios'

function Product() {
    const { name } = useParams()

    let content = null
    let relatedProductsContent = null;
    let product = FetchData(`https://192.168.8.103:8443/products/${name}`)
    let relatedProducts = FetchData(`https://192.168.8.103:8443/products/related/${name}`)

    const addCartItem = () => {
        const url = `https://192.168.8.103:8443/products/cart/post`
        axios.post(url, name, {
            headers: {
                'Content-Length': 0,
                'Content-Type': 'text/plain'
            }
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    if (product.error) {
        content = <p>
            There was an error please refresh or try again later
        </p>
    }

    if (product.loading) {

    }

    if (relatedProducts.data) {
        relatedProductsContent =
            relatedProducts.data.map((product, key) =>
                <ProductCard name={product.name} price={product.price} image_url={product.image_url} />
            )
    }

    if (product.data) {
        content = <div>
            <div id="product">
                <img id="image" alt="" src={product.data.image_url} />
                <div id="descriptionBox">
                    <h2 id="name">{product.data.name}</h2>
                    <p id="price">{product.data.price.toFixed(2)} €</p>
                    <p id="stock">{product.data.stock} is left</p>
                    <button id="addToCartButton" onClick={() => addCartItem()}> Add to cart
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                </div>
            </div>
            <h3 id="productListTitle">Top 3 products that people have bought with it</h3>
            <div id="productList">
                {relatedProductsContent}
            </div>
        </div>
    }
    return (
        <div>{content}</div>
    )
}

export default Product