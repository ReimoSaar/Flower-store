import React from 'react'
import "../../Style/Components/ProductCard.scss"
import { Link } from 'react-router-dom'
import outOfStockImage from '../../resources/out_of_stock.png';

function ProductCard({ name, price, stock, image_url }) {
    const setImage = () => {
        if (stock <= 0) {
            return (
                <div  className="image-box">
                    <img className="image-box__image image-box__image--product" key={name} src={image_url} alt="" width="350" height="200" />
                    <img className="image-box__image image-box__image--out-of-stock" src={outOfStockImage} alt="" width="350" height="200" />
                </div>
            )
        } else {
            return (
                <div className="image-box">
                    <img className="image-box__image image-box__image--product" key={name} src={image_url} alt="" width="350" height="200" />
                </div>
            )
        }
    }
    return (
        <Link to={`/products/${name}`} className="product-card">
            <h2 className="product-card__name">{name}</h2>
            {setImage()}
            <p className="product-card__price">{price.toFixed(2)} €</p>
        </Link>
    )
}

export default ProductCard