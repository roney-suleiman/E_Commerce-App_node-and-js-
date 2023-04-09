import React from 'react';
import { useNavigate } from 'react-router-dom'

function NoMatch(props) {

    const navigate = useNavigate()

    function clickHandler() {
        console.log("Test")
        navigate("/")
    }

    return (
        <div>
            <h5>404</h5>
            <button onClick={clickHandler}>zurück zur Startseite</button>
            <button onClick={() => {navigate(-1)}}>zurück</button>
        </div>
    );
}

export default NoMatch;