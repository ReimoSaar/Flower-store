import React, { useState, useEffect } from 'react'
import CartItem from "./CartItem"
import "../../Style/Cart.css"
import axios from 'axios'

function Cart() {
    let content = null

    const [cartSum, setCartSum] = useState(0)

    const [cartItems, setCartItems] = useState(null)

    const changeCartSum = () => {
        axios.get('https://192.168.8.103:8443/products/cart/sum')
            .then(response => {
                setCartSum(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    const loadCartItems = () => {
        axios.get('https://192.168.8.103:8443/products/cart')
        .then(response => {
            setCartItems(response.data)
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    useEffect(() => {
        changeCartSum()
        loadCartItems()
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
        <div id="cart">
            {content}
            <p id="totalCartPrice">total: {cartSum} €</p>
        </div>
    )
}

export default Cart