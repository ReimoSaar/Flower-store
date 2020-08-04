import "../../Style/Components/FilterBox.scss"
import React from 'react'

function FilterBox({changeProducts}) {
    return (
        <select className="select-box" onChange={e => changeProducts(e.target.value)}>
            <option className="select-box__item" value="atoz">a-z</option>
            <option className="select-box__item" value="ztoa">z-a</option>
        </select>
    )
}

export default FilterBox