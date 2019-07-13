import React from 'react';

const Event = (props) => {
    return (    
        <div>
            <h1>{props.name}, {props.location}</h1>
            <p>{props.startDate} - {props.endDate}</p>
            <p>
                Website - <a href={props.url}>{props.url}</a>
            </p>
        </div>
    )
}

export default Event;