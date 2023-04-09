import React from 'react';
import { NavLink } from 'react-router-dom'

function Nav(props) {

    const VER = "Vertrieb"
    const MARK = "Marketing"
    const PERS = "Personal"

    const ID = 99.99

    return (
        <nav>
            <NavLink to="/">Startseite</NavLink><br />
            <NavLink to="/about">Über uns</NavLink><br />
            <NavLink to={"/team"} end>Team</NavLink><br />
            {/* <NavLink to={"/team/"+VER}>Team / Vertrieb</NavLink><br /> */}
            <NavLink to={`/team/${VER}`}>Team / Vertrieb</NavLink><br />
            <NavLink to={`/team/${MARK}`}>Team / Marketing</NavLink><br />
            <NavLink to={`/team/${MARK}/${ID}`}>Team / Marketing / ID</NavLink><br />
            <NavLink to={`/team/${PERS}`}>Team / Personal</NavLink><br />
            <NavLink to="/products" end>Produkte</NavLink><br />
            <NavLink to="/products/new">Produkte / Neu</NavLink><br />
            <NavLink to="/products/featured">Produkte / Vorgestellt</NavLink>
        </nav>
    );
}

export default Nav;