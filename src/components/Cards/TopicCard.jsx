import React from 'react';
import '../../styles/TopicCard.css';
import { Card, Image, Button, Grid } from 'semantic-ui-react'


function TopicCard({topic, location, deleteTopic, addInterest, addDislike, deleteInterest, deleteDislike}) { 

  const delTopicHandler = () => deleteTopic(topic._id);
  const addIntHandler = () => addInterest(topic._id);
  const addDisHandler = () => addDislike(topic._id);
  const delIntHandler = () => deleteInterest(topic._id);
  const delDisHandler = () => deleteDislike(topic._id);

  return (
    <>
    <Grid>
      <Grid.Row style={{ textAlign: 'left' }}>
        <Grid.Column style={{ width: '16rem', padding: '0', margin: '0 0 0 1rem' }}>
          <Card id='topicCard'>
            <Card.Content id='topicContent'>
                <Image
                    id='topicImg'
                    floated='left'
                    size='tiny'
                    src={topic && topic.icon ? topic.icon : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
                />
            <strong>{topic ? topic.title : null}</strong>
            <br />
            {topic ? topic.description : null}
            
        
            </Card.Content>
          </Card>
        </Grid.Column >


      {location === "form" ?
        <Grid.Column style={{ margin: '1rem' }}>
          <Button onClick={delTopicHandler}>
            X
          </Button>
        </Grid.Column>
        :
        null
      } 
      {location === "search" ?
        <Grid.Column style={{ width: 'auto', margin: '0 0.75rem', padding: '0' }}>
          <Grid.Row>
            <Button onClick={addIntHandler} style={{ width: '1.5rem', height: '1.5rem', margin: '0.25rem', padding: '0' }}>
            +
            </Button>
          </Grid.Row>
          <Grid.Row>
            <Button onClick={addDisHandler} style={{ width: '1.5rem', height: '1.5rem', margin: '0.25rem', padding: '0' }}>
            -
            </Button>
          </Grid.Row>
        </Grid.Column>
        :
        null
      }
      {location === "interests" ?
        <Grid.Column>
          <Button onClick={delIntHandler} style={{ width: '2rem', height: '2rem', margin: '0.25rem', padding: '0' }}>
            X
          </Button>
        </Grid.Column>
        :
        null
      }
      {location === "dislikes" ?
        <Grid.Column>
          <Button onClick={delDisHandler} style={{ width: '2rem', height: '2rem', margin: '0.25rem', padding: '0' }}>
            X
          </Button>
        </Grid.Column>
      :
        null
      }
  
        
    
    
      
      
      

    </Grid.Row>
  </Grid>
  </>

  );
}

export default TopicCard;