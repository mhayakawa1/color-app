import React from 'react';

export default function Feature(props) {

    return (
        <div className={`feature ${props.className}`}>{props.children}</div>
    )
}