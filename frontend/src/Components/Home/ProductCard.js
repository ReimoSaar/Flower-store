import React from 'react'
import "../../Style/ProductCard.css"

function ProductCard({name, price, stock, image_url}) {
    return (
        <div id="productCard">
            <h2 id="name">{name}</h2>
            <img id="image" key={name} src={image_url} alt="flower" width="350" height="200" />
            <p id="price">{price.toFixed(2)} €</p>
        </div>
    )
}

export default ProductCard