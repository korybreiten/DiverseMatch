import React from 'react';
import { Grid } from 'semantic-ui-react';
import TopicCard from '../Cards/TopicCard';



export default function ProfileDisplay({user, interests, dislikes, deleteInterest, deleteDislike}) {

    return (
      <Grid>

        <Grid.Column>
          <Grid.Row>
            <h2>Interests</h2>
            {!interests || typeof interests == 'undefined' ? <h2>No Data</h2> : !Array.isArray(interests) ? <h2>Results are not Array</h2> :
              interests.map((topic) => {
                return ( 
                  <TopicCard topic={topic} key={topic._id} user={user} location={"interests"} deleteInterest={deleteInterest} deleteDislike={deleteDislike} />
                )
              })
            }
          </Grid.Row>
          <Grid.Row>
            <h2>Dislikes</h2>
            {!dislikes || typeof dislikes == 'undefined' ? <h2>No Data</h2> : !Array.isArray(dislikes) ? <h2>Results are not Array</h2> :
              dislikes.map((topic) => {
                return ( 
                  <TopicCard topic={topic} key={topic._id} user={user} location={"dislikes"} deleteInterest={deleteInterest} deleteDislike={deleteDislike} />
                )
              })
            }
          </Grid.Row>
        </Grid.Column>
    
      </Grid>
    
      );
}
