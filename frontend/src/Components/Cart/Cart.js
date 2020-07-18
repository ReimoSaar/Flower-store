import React from 'react'
import CartItem from "./CartItem"
import FetchData from "../../Tools/FetchData"
import "../../Style/Cart.css"

function Cart() {
    let cartItems = FetchData('https://192.168.8.103:8443/products/cart')

    let content = null

    if (cartItems.data) {
        content = cartItems.data.map((cartItem, key) =>
            <CartItem
                id={cartItem.id}
                name={cartItem.name}
                stock={cartItem.stock}
                price={cartItem.price}
                image_url={cartItem.image_url}
                quantity={cartItem.quantity}
            />
        )
    }
    return (
        <div id="cart">
            {content}
            <p>total: </p>
        </div>
    )
}

export default Cart