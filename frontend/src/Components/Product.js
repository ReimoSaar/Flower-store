import React, { useState, useEffect } from 'react'
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
    let product = FetchData(`https://192.168.8.102:8443/store/${name}`)
    let relatedProducts = FetchData(`https://192.168.8.102:8443/store/related/${name}`)
    let [isInCart, setIsInCart] = useState(false)
    let [isProductAvailable, setIsProductAvailable] = useState(false)

    const addCartItem = () => {
        const url = 'https://192.168.8.102:8443/store/cart/post'
        axios.post(url, name, {
            headers: {
                'Content-Length': 0,
                'Content-Type': 'text/plain'
            }
        })
            .then(() => {
                checkIfItemInCart()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const checkIfItemInCart = () => {
        const url = `https://192.168.8.102:8443/store/cart/exist/${name}`
        axios.get(url)
            .then(response => {
                setIsInCart(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const checkProductAvailable = () => {
        const url = `https://192.168.8.102:8443/store/stock/${name}`
        axios.get(url)
            .then(response => {
                if (response.data > 0) {
                    setIsProductAvailable(true)
                    checkIfItemInCart()
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const removeCartItem = () => {
        const url = "https://192.168.8.102:8443/store/cart/delete"
        axios.delete(url, {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "name": name
            }
        })
            .then(() => {
                checkIfItemInCart()
            })
    }

    if (product.error) {
        content = <p>
            There was an error please refresh or try again later
        </p>
    }

    if (relatedProducts.data) {
        relatedProductsContent =
            relatedProducts.data.map((product, key) =>
                <ProductCard name={product.name} price={product.price} stock={product.stock} image_url={product.image_url} />
            )
    }

    const addCartButton = () => {
        let button = null;
        if (isProductAvailable) {
            if (isInCart) {
                button = <button id="removeFromCartButton" onClick={() => removeCartItem()}> Remove from cart
            <FontAwesomeIcon icon={faShoppingCart} />
                </button>
            } else {
                button = <button id="addToCartButton" onClick={() => addCartItem()}> Add to cart
            <FontAwesomeIcon icon={faShoppingCart} />
                </button>
            }
        }
        return (
            button
        )
    }

    useEffect(() => {
        checkProductAvailable()
        // eslint-disable-next-line
    }, [name])

    if (product.data) {
        content = <div>
            <div id="product">
                <img id="image" alt="" src={product.data.image_url} />
                <div id="descriptionBox">
                    <h2 id="name">{product.data.name}</h2>
                    <p id="price">{product.data.price.toFixed(2)} €</p>
                    <p id="stock">{product.data.stock} is left</p>
                    {addCartButton()}
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