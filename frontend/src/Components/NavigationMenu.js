import React from 'react'
import { Link } from 'react-router-dom'
import "../Style/Components/NavigationMenu.scss"

function NavigationMenu(props) {
    return (
        <div className="navigation-menu">
            <h2 className="navigation-menu__title">Menu</h2>
            <p>
                <Link
                    to="/"
                    onClick={props.closeMenu}
                    className="navigation-menu__text">
                    Products
                </Link>
            </p>
            <hr></hr>
            <p>
                <Link
                    to="/cart"
                    onClick={props.closeMenu}
                    className="navigation-menu__text">
                    Cart
                </Link>
            </p>
            <hr></hr>
        </div>
    )
}

export default NavigationMenu