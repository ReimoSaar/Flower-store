import React from 'react'
import "../../Style/ProductCard.css"
import { Link } from 'react-router-dom'

function ProductCard({name, price, stock, image_url}) {
    return (
        <Link to={`products/${name}`} id="productCard">
            <h2 id="name">{name}</h2>
            <img id="image" key={name} src={image_url} alt="" width="350" height="200" />
            <p id="price">{price.toFixed(2)} €</p>
        </Link>
    )
}

export default ProductCard