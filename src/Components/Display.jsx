import React from 'react';

export default function Display(props) {

    return (
        <div className={`display ${props.className}`}>{props.children}</div>
    )
}