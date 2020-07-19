import React, { useState, useEffect } from 'react'
import CartItem from "./CartItem"
import FetchData from "../../Tools/FetchData"
import "../../Style/Cart.css"
import axios from 'axios'

function Cart() {
    let cartItems = FetchData('https://192.168.8.103:8443/products/cart')
    let content = null

    const [cartSum, setCartSum] = useState(0)

    const changeCartSum = () => {
        axios.get('https://192.168.8.103:8443/products/cart/sum')
            .then(response => {
                setCartSum(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        changeCartSum()
    }, [])

    if (cartItems.data) {
        content = cartItems.data.map((cartItem, key) =>
            <CartItem
                id={cartItem.id}
                name={cartItem.name}
                stock={cartItem.stock}
                price={cartItem.price}
                image_url={cartItem.image_url}
                quantity={cartItem.quantity}
                changeCartSum={changeCartSum}
            />
        )
    }
    return (
        <div id="cart">
            {content}
            <p>total: {cartSum} €</p>
        </div>
    )
}

export default Cart