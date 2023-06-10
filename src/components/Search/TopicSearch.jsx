import React, { useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import TopicFeed from '../Feeds/TopicFeed';
import topicsService from '../../utils/topicService';




export default function Search({addInterest, addDislike}){
  const [state, setState] = useState({});
  const [topics, setTopics] = useState([]);

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(){
    try {
      if (state.title) {
        const data = await topicsService.search({keyword: state.title});
        setTopics(data);
      } else {
        getTopics()
      }
      
    } catch(err){
      console.log(err, 'Search Topics Error!');
    }
  }

  async function getTopics(){
    try {
      const data = await topicsService.getAllTopics();
      setTopics( data );
    } catch(err){
      console.log(err, 'Get All Topics Search Error!');
    }
  }

  
  
  return (
  <>
      <Form  autoComplete="off" onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>

        <Grid>
          <Grid.Row style={{ textAlign: 'left' }}>
            <Grid.Column style={{ width: '60%', paddingRight: 0 }}>
              <Form.Input
                  className="search-input"
                  name="title"
                  placeholder="Search Topics"
                  onChange={handleChange}
              />
            </Grid.Column>
            <Grid.Column >
              <Button type="submit" className="btn">
              Search
              </Button>

          </Grid.Column>
          </Grid.Row>
        </Grid>
        </Form>

      <Grid>
        <Grid.Column >
          <TopicFeed topics={topics} location={"search"} addInterest={addInterest} addDislike={addDislike} />
        </Grid.Column>
      </Grid>

  </>
  
  );
}