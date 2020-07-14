import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from 'react-spring'
import NavigationMenu from "./NavigationMenu"
import "../Style/Navigation.css"

function Navigation() {
    const [show, set] = useState(false)
    const menuTransitions = useTransition(show, null, {
        from: { position: 'absolute', opacity: 0, left: '-31%' },
        enter: { opacity: 1, left: '0' },
        leave: { opacity: 0, left: '-31%' },
    })
    const maskTransitions = useTransition(show, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 0.3 },
        leave: { opacity: 0 },
    })

    return (
        <div>
            <FontAwesomeIcon id="navButton" icon={faBars} onClick={() => set(!show)}/>
            {
                maskTransitions.map(({ item, key, props }) =>
                item && <animated.div id="background" key={key} style={props} onClick={() => set(!show)}>
                </animated.div>
            )
            }
            {
                menuTransitions.map(({ item, key, props }) =>
                    item && <animated.div id="menu" key={key} style={props}>
                        <NavigationMenu closeMenu={() => set(false)}/>
                    </animated.div>
                )
            }
        </div>
    )
}

export default Navigation