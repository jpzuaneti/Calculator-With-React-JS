import React from 'react'
import Button from './Button.css'

export default props => {
    let classes = 'button '
    classes += props.operation ? 'operation': ''
    classes += props.triple ? 'triple': ''
    classes += props.double ? 'double': ''

    return (
        <button className={classes}
            onClick={e => props.click && props.click(props.label)}
        >
            {props.label}
        </button>
    )
}