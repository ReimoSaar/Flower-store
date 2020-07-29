import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FetchData from '../Tools/FetchData'
import "../Style/Components/Product.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import ProductCard from "./Products/ProductCard"
import axios from 'axios'
import getBackendDomainAndPort from "../Tools/getBackendDomainAndPort"

function Product() {
    const { name } = useParams()

    let content = null
    let relatedProductsContent = null;
    let product = FetchData(`https://${getBackendDomainAndPort()}/products/${name}`)
    let relatedProducts = FetchData(`https://${getBackendDomainAndPort()}/products/related/${name}`)
    let [isInCart, setIsInCart] = useState(false)
    let [isProductAvailable, setIsProductAvailable] = useState(false)

    const addCartItem = () => {
        const url = `https://${getBackendDomainAndPort()}/cart/post`
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
        const url = `https://${getBackendDomainAndPort()}/cart/exist/${name}`
        axios.get(url)
            .then(response => {
                setIsInCart(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const checkProductAvailable = () => {
        const url = `https://${getBackendDomainAndPort()}/products/stock/${name}`
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
        const url = `https://${getBackendDomainAndPort()}/cart/delete`
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
                button = <button className="product__cart-button product__cart-button--remove" onClick={() => removeCartItem()}> Remove from cart
            <FontAwesomeIcon icon={faShoppingCart} />
                </button>
            } else {
                button = <button className="product__cart-button product__cart-button--add" onClick={() => addCartItem()}> Add to cart
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
            <div className="product">
                <img className="product__image" alt="" src={product.data.image_url} />
                <div className="product__description-box">
                    <h2 className="product__name">{product.data.name}</h2>
                    <p className="product__price">{product.data.price.toFixed(2)} €</p>
                    <p className="product__stock">{product.data.stock} is left</p>
                    {addCartButton()}
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