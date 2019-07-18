import React from 'react';


const getDate = (date, {day = true, month = true, year = true} = {}) => (
date.toLocaleDateString('en-US', {
        day: day ? 'numeric' : undefined,
        month: month ? 'long' : undefined,
        year: year ? 'numeric' : undefined
    })
)


const EventDate = ({ startDate, endDate }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isOneDay = start.toDateString() === end.toDateString();

    return (
        <>
            <time dateTime={start.toISOString()}>
                { getDate( start ) }
            </time>

            { !isOneDay && (
                <>
                     - 
                    <time dateTime={end.toISOString()}>
                        {getDate(end)}
                    </time>
                </>
            )

            }
        </>
    );
}


const Event = (props) => {
    return (    
        <div>
            <h1>{props.name}, {props.location}</h1>
            {/* <p>{props.startDate} - {props.endDate}</p> */}
            <p> <EventDate startDate={props.startDate} endDate={props.endDate} /> </p>
            <p>
                Website - <a href={props.url}>{props.url}</a>
            </p>
        </div>
    )
}

export default Event;