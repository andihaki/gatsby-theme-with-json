import React from 'react'
import {Link} from 'gatsby'
import { Styled } from 'theme-ui';


const EventList = ({events}) => (
    <>
        <Styled.h2>Upcoming Events</Styled.h2>
        <ul>
            {
                events.map(event => (
                    <Styled.li key={event.id}> 
                        <strong>
                            <Link to={event.slug}>
                                {event.name}
                            </Link>
                        </strong>
                        <br/>
                        {
                            new Date( event.startDate).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })
                        } in {event.location}
                    </Styled.li>
                ))
            }
        </ul>
    </>
)


export default EventList;