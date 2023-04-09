import React from 'react';
import { Link } from 'react-router-dom'

function About(props) {
    return (
        <div>
            Über {props.wen}<br />
            <Link to="/">zur Startseite</Link>
        </div>
    );
}

export default About;