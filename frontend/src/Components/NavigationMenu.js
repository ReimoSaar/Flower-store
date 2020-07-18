import React from 'react'
import { Link } from 'react-router-dom'

function NavigationMenu(props) {
    return (
        <div>
            <h2>Menu</h2>
            <ul>
                <li>
                    <Link
                        to="/"
                        onClick={props.closeMenu}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/cart"
                        onClick={props.closeMenu}>
                        Cart
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavigationMenu