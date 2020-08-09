import React from 'react'
import { Link } from 'react-router-dom'
import "../Style/Components/NavigationMenu.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faStore } from '@fortawesome/free-solid-svg-icons'

function NavigationMenu({ closeMenu }) {
    return (
        <div className="navigation-menu">
            <FontAwesomeIcon class="navigation-menu__nav-button" icon={faBars} onClick={closeMenu} />
            <h2 className="navigation-menu__title">Menu</h2>
            <div>
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="navigation-menu__link">
                    <FontAwesomeIcon icon={faStore} className="navigation-menu__icon" />
                    Products
                </Link>
            </div>
            <hr></hr>
            <div>
                <Link
                    to="/cart"
                    onClick={closeMenu}
                    className="navigation-menu__link">
                    <FontAwesomeIcon icon={faShoppingCart} className="navigation-menu__icon" />
                    Cart
                </Link>
            </div>
            <hr></hr>
        </div>
    )
}

export default NavigationMenu