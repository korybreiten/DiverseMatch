import React from 'react';
import { Card  } from 'semantic-ui-react'
import MatchCard from '../Cards/MatchCard';


export default function MatchFeed({matches}){
    return (
        <Card.Group itemsPerRow={1} stackable>
            {!matches || typeof matches == 'undefined' ? <h2>No Data</h2> : !Array.isArray(matches) ? <h2>Results are not Array</h2> :
                matches.map((match, idx) => {
                    return ( 
                        <MatchCard match={match} key={idx} />
                    )
                })
            }
        </Card.Group>
    )
}