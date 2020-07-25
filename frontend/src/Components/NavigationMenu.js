import React from 'react'
import { Link } from 'react-router-dom'
import "../Style/NavigationMenu.css"

function NavigationMenu(props) {
    return (
        <div id="navigationMenu">
            <h2 id="navigationMenuTitle">Menu</h2>
            <p>
                <Link
                    to="/"
                    onClick={props.closeMenu}
                    className="navigationMenuText">
                    Products
                </Link>
            </p>
            <hr></hr>
            <p>
                <Link
                    to="/cart"
                    onClick={props.closeMenu}
                    className="navigationMenuText">
                    Cart
                </Link>
            </p>
            <hr></hr>
        </div>
    )
}

export default NavigationMenu