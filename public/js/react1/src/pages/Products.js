import React from 'react';
import { Outlet, NavLink } from 'react-router-dom'

function Products(props) {
    return (
        <div>
            Products
            <Outlet /><br />
            <NavLink to="new">Produkte / Neu</NavLink>&nbsp;|&nbsp;
            <NavLink to="featured">Produkte / Vorgestellt</NavLink>
        </div>
    );
}

export default Products;