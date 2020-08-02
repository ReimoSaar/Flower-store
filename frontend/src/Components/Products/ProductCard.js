import React, { useState } from 'react'
import "../../Style/Components/ProductCard.scss"
import { Link } from 'react-router-dom'
import outOfStockImage from '../../resources/out_of_stock.png';
import { useSpring, animated } from 'react-spring'
import CartButton from "../CartButton"

function ProductCard({ name, price, stock, image_url }) {
    const [showCartButton, setShowCartButton] = useState(false)
    const cartButtonStyle = useSpring({
        overflow: 'hidden',
        height: showCartButton ? 150 : 0
    })
    const productsCardBorderStyle = useSpring({
        to: async (next, cancel) => {
            if (showCartButton) {
                await next({
                    config: {duration: 0},
                    position: 'absolute',
                    zIndex: 6
                })
                await next({
                    config: { duration: 500},
                    boxShadow: "0px 0px 1.6rem 0px rgba(0,0,0,0.48)"
                })
            } else {
                await next({
                    config: { duration: 0},
                    zIndex: 1
                })
                await next({
                    config: { duration: 500},
                    boxShadow: "0px 0px 1.6rem 0px rgba(0,0,0,0)",
                })
                await next({
                    config: { duration: 0},
                    position: 'relative',
                    zIndex: 0
                })
            }
        },
        from: {
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            backgroundColor: 'white',
        }
    })
    const setImage = () => {
        if (stock <= 0) {
            return (
                <div className="image-box">
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
        <Link to={`/products/${name}`} className="product-card-container">
            <animated.div className="product-card" style={productsCardBorderStyle} onMouseEnter={() => setShowCartButton(true)} onMouseLeave={() => setShowCartButton(false)}>
                <h2 className="product-card__name">{name}</h2>
                {setImage()}
                {
                    <animated.div style={cartButtonStyle}>
                        <p className="product-card__stock">{stock} is left</p>
                        <CartButton productName={name} className="product-card__cart-button"/>
                    </animated.div>
                }
                <p className="product-card__price">{price.toFixed(2)} €</p>
            </animated.div>
        </Link>
    )
}

export default ProductCard