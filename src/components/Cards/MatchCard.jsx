import React from 'react';
import '../../styles/MatchCard.css';
import { Card, Image, Grid } from 'semantic-ui-react'


function MatchCard({match}) {
  return (
    <>
    <Grid>
      <Grid.Row style={{ textAlign: 'left', width: '16rem', padding: '0', margin: '1rem 0 1rem 1rem' }}>
          <Card id='matchCard' key={match._id}>
            <Card.Content id='matchContent'>
                <Image
                    id='matchImg'
                    floated='left'
                    size='tiny'
                    src={match.avatar ? match.avatar : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
                />
            <h3><strong>{match.username}</strong></h3>
            <strong>Match Score: {match.matchScore}</strong>
            <br />
            Interests: {match.matchIntNum} Dislikes: {match.matchDisNum}
            <br />
            Mismatches: {match.mismatchNum}
            </Card.Content>
          </Card>
    </Grid.Row>
  </Grid>
  </>

  );
}

export default MatchCard;