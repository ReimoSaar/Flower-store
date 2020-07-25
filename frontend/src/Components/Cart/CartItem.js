import React, { useState, useEffect } from 'react'
import "../../Style/CartItem.css"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getBackendDomainAndPort from "../../Tools/getBackendDomainAndPort"

function CartItem({ id, name, stock, price, image_url, quantity, changeCartSum, loadCartItems }) {
    const [quantityNum, setQuantityNum] = useState(quantity)

    const updateQuantityNum = (number) => {
        const newQuantity = quantityNum + number
        if (newQuantity <= stock && newQuantity >= 1) {
            setQuantityNum(newQuantity)
        }
    }

    // updates quantity in database
    useEffect(() => {
        const url = `https://${getBackendDomainAndPort()}/store/cart/put`
        axios.put(url, {
            "quantity": quantityNum,
            "id": id
        })
            .then(() => {
                axios.get(`https://${getBackendDomainAndPort()}/store/cart/sum`)
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
        const url = `https://${getBackendDomainAndPort()}/store/cart/delete`
        axios.delete(url, {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "name": name
            }
        })
        .then(() => {
            loadCartItems()
        })
    }

    return (
        <div className="cartItem">
            <Link to={`/products/${name}`}>
                <img className="cartItemImage" src={image_url} alt=""></img>
            </Link>
            <p className="cartItemText"> <b>{name}</b> </p>
            <p className="cartItemText"> In stock: {stock} </p>
            <p className="cartItemText"> price: {price} €</p>
            <div className="quantityChanger">
                <button className="quantityChangerButton" onClick={() => updateQuantityNum(-1)}>-</button>
                <p style={{display: 'inline-block', fontSize: '1.5rem', verticalAlign: 'middle', width: '2.5rem', textAlign: 'center'}}> {quantityNum} </p>
                <button className="quantityChangerButton" onClick={() => updateQuantityNum(1)}>+</button>
            </div>
            <FontAwesomeIcon class="removeItemButton" onClick={() => removeItem()} icon={faTimes} />
            <hr></hr>
        </div>
    )
}

export default CartItem