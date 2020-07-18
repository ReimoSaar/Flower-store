import React, { useState, useEffect } from 'react'
import "../../Style/CartItem.css"
import { Link } from 'react-router-dom'
import axios from 'axios';

function CartItem({ id, name, stock, price, image_url, quantity }) {
    const [quantityNum, setQuantityNum] = useState(quantity)

    // updates quantity in database
    useEffect(() => {
        const url = `https://192.168.8.103:8443/products/cart/put/${id}/${quantityNum}`
        axios.put(url)
            .catch(error => {
                console.log(error.message)
            })
            // eslint-disable-next-line
    }, [quantityNum])
    
    return (
        <div className="cartItem">
            <Link to={`/products/${name}`}>
                <img className="cartItemImage" src={image_url} alt=""></img>
            </Link>
            <p className="cartItemText"> {name} </p>
            <p className="cartItemText"> In stock: {stock} </p>
            <p className="cartItemText"> price: {price} €</p>
            <div className="quantityChanger">
                <button className="quantityChangerButton" onClick={() => setQuantityNum(quantityNum - 1)}>-</button>
                <p className="cartItemText"> {quantityNum} </p>
                <button className="quantityChangerButton" onClick={() => setQuantityNum(quantityNum + 1)}>+</button>
            </div>
            <hr></hr>
        </div>
    )
}

export default CartItem