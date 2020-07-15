import React from 'react'
import { useParams } from 'react-router-dom'
import FetchData from '../Tools/FetchData'
import "../Style/Product.css"

function Product() {
    const { name } = useParams()
    const url = `https://192.168.8.102:8443/products/${name}`

    let content = null

    let product = FetchData(url)

    if (product.error) {
        content = <p>
            There was an error please refresh or try again later
        </p>
    }

    if (product.loading) {

    }

    if (product.data) {
        content = <div>
            <div id="product">
                <img id="image" alt="" src={product.data.image_url} />
                <div id="descriptionBox">
                    <h2 id="name">{product.data.name}</h2>
                    <p id="price">{product.data.price.toFixed(2)} €</p>
                    <p id="stock">{product.data.stock} is left</p>
                </div>
            </div>
        </div>
    }
    return (
        <div>{content}</div>
    )
}

export default Product