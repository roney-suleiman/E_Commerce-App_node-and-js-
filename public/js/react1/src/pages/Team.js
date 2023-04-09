import React from 'react';
import { useParams } from 'react-router-dom'

function Team(props) {

    const PARAMS = useParams()

    return (
        <div>
            <h4>Team</h4>
            {
                PARAMS.department === "Vertrieb" &&
                <h5>Vertrieb</h5>
            }
            {
                PARAMS.department === "Marketing" &&
                <h5>Marketing</h5>
            }
            {
                PARAMS.department === "Personal" &&
                <h5>Personal</h5>
            }
            {
                PARAMS.department === undefined &&
                <h5>Andere Abteilung</h5>
            }
            {
                PARAMS.id != undefined &&
                <h5>ID: {Number(PARAMS.id)+1}</h5>
            }
        </div>
    );
}

export default Team;