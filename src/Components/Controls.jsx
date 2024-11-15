import React from 'react';

export default function Controls(props) {

    return (
        <div className={`controls ${props.className}`}>{props.children}</div>
    )
}