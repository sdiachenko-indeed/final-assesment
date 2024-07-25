
import React from 'react';

function DisplayBreadcrumbs({ children }) {
    return <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">
                <i className="oi oi-home"></i> Home
            </a></li>
            <li className="breadcrumb-item active" aria-current="page">
                {children}
            </li>
        </ol>
    </nav>
}

export default DisplayBreadcrumbs;