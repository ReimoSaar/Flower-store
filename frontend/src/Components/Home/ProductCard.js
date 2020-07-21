import React, { useState } from 'react'
import "../../Style/ProductCard.css"
import { Link } from 'react-router-dom'
import outOfStockImage from '../../resources/out_of_stock.png';

function ProductCard({ name, price, stock, image_url }) {
    let image = null;
    const setImage = () => {
        if (stock <= 0) {
            return (
                <div id="imageBox">
                    <img id="image" key={name} src={image_url} alt="" width="350" height="200" />
                    <img id="out_of_stock_image" src={outOfStockImage} alt="" width="350" height="200" />
                </div>
            )
        } else {
            return (
                <div id="imageBox">
                    <img id="image" key={name} src={image_url} alt="" width="350" height="200" />
                </div>
            )
        }
    }
    return (
        <Link to={`/products/${name}`} id="productCard">
            <h2 id="name">{name}</h2>
            {setImage()}
            <p id="price">{price.toFixed(2)} €</p>
        </Link>
    )
}

export default ProductCard