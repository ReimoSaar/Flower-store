import React, { useState, useEffect } from 'react'
import axios from 'axios'
import getBackendDomainAndPort from "../Tools/getBackendDomainAndPort"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "../Style/Components/CartButton.scss"

function CartButton({ productName }) {
    let [isInCart, setIsInCart] = useState(false)
    let [isProductInStock, setIsProductInStock] = useState(false)

    const addCartItem = () => {
        const url = `https://${getBackendDomainAndPort()}/cart/post`
        axios.post(url, productName, {
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
        const url = `https://${getBackendDomainAndPort()}/cart/exist/${productName}`
        axios.get(url)
            .then(response => {
                setIsInCart(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const checkProductAvailable = () => {
        const url = `https://${getBackendDomainAndPort()}/products/stock/${productName}`
        axios.get(url)
            .then(response => {
                if (response.data > 0) {
                    setIsProductInStock(true)
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
                "name": productName
            }
        })
            .then(() => {
                checkIfItemInCart()
            })
    }

    const addCartButton = () => {
        let button = null;
        if (isProductInStock) {
            if (isInCart) {
                button =
                <button className="cart-button cart-button--remove" onClick={() => removeCartItem()}> Remove from cart
                    <FontAwesomeIcon icon={faShoppingCart} />
                </button>
            } else {
                button =
                <button className="cart-button cart-button--add" onClick={() => addCartItem()}> Add to cart
                    <FontAwesomeIcon icon={faShoppingCart} />
                </button>
            }
        } else {
            button =
            <button className="cart-button cart-button--disabled"> Add to cart
                <FontAwesomeIcon icon={faShoppingCart} />
            </button>
        }
        return (
            button
        )
    }

    useEffect(() => {
        checkProductAvailable()
        // eslint-disable-next-line
    }, [])

    return (
        addCartButton()
    )
}

export default CartButton
