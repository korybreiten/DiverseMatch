import React from 'react';
import { Card  } from 'semantic-ui-react'
import TopicCard from '../Cards/TopicCard';


export default function TopicFeed({topics, user, location, deleteTopic, addInterest, addDislike}){

    return (
        <Card.Group itemsPerRow={1} stackable>
            {!topics || typeof topics == 'undefined' ? <h2>No Data</h2> : !Array.isArray(topics) ? <h2>Results are not Array</h2> :
                topics.map((topic, idx) => {
                    return ( 
                            <TopicCard topic={topic} key={idx} location={location} user={user} deleteTopic={deleteTopic} addInterest={addInterest} addDislike={addDislike} />
                        )
                })
            }
        </Card.Group>
    )
}
