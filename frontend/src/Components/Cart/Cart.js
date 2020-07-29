import React, { useState, useEffect } from 'react'
import CartItem from "./CartItem"
import "../../Style/Components/Cart.scss"
import axios from 'axios'
import getBackendDomainAndPort from "../../Tools/getBackendDomainAndPort"

function Cart() {
    let content = null

    const [cartSum, setCartSum] = useState(0)

    const [cartItems, setCartItems] = useState(null)

    const changeCartSum = () => {
        axios.get(`https://${getBackendDomainAndPort()}/cart/sum`)
            .then(response => {
                setCartSum(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const loadCartItems = () => {
        axios.get(`https://${getBackendDomainAndPort()}/cart`)
            .then(response => {
                setCartItems(response.data)
                changeCartSum()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const sendOrder = () => {
        axios.post(`https://${getBackendDomainAndPort()}/order`)
            .then(() => {
                loadCartItems()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        loadCartItems()
        // eslint-disable-next-line
    }, [])

    if (cartItems) {
        content = cartItems.map((cartItem, key) =>
            <CartItem
                id={cartItem.id}
                name={cartItem.name}
                stock={cartItem.stock}
                price={cartItem.price}
                image_url={cartItem.image_url}
                quantity={cartItem.quantity}
                changeCartSum={changeCartSum}
                loadCartItems={loadCartItems}
            />
        )
    }
    return (
        <div>
            <div className="cart">
                {content}
                <p className="cart__total-price">total: {cartSum} €</p>
            </div>
            <button className="cart__buy-button" onClick={() => sendOrder()}>Buy</button>
        </div>
    )
}

export default Cart