import React, { useState, useEffect } from 'react'
import "../../Style/CartItem.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CartItem({ id, name, stock, price, image_url, quantity, changeCartSum, loadCartItems }) {
    const [quantityNum, setQuantityNum] = useState(quantity)

    // updates quantity in database
    useEffect(() => {
        const url = 'https://192.168.8.103:8443/products/cart/put'
        axios.put(url, {
            "quantity": quantityNum,
            "id": id
        })
            .then(() => {
                axios.get('https://192.168.8.103:8443/products/cart/sum')
                    .then(() => {
                        changeCartSum()
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            })
            .catch(error => {
                console.log(error.message)
            })
        // eslint-disable-next-line
    }, [quantityNum])

    const removeItem = () => {
        const url = "https://192.168.8.103:8443/products/cart/delete"
        axios.delete(url, {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "id": id
            }
        })
        .then(() => {
            loadCartItems()
            changeCartSum()
        })
    }

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
            <FontAwesomeIcon onClick={() => removeItem()} style={{ color: 'red', marginLeft: '2rem' }} icon={faTimes} />
            <hr></hr>
        </div>
    )
}

export default CartItem