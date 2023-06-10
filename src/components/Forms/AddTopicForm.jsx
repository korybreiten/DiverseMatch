import React, { useState, useEffect } from 'react';
import TopicFeed from '../Feeds/TopicFeed';
import topicService from '../../utils/topicService';
import imageService from '../../utils/imageService';
import { Button, Form, Segment, Grid } from 'semantic-ui-react'

export default function AddTopicForm({user}){
  const [selectedFile, setSelectedFile] = useState('')
  const [topics, setTopics] = useState();
  const [state, setState] = useState({
    title: '',
    description: ''
  })

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleAddTopic(){
    try {
      let imageData = new FormData();
      imageData.append('image', selectedFile);
      const location = await imageService.saveImage(imageData);
      await topicService.create({
        title: state.title,
        description: state.description,
        user: user._id,
        icon: location
      });

      setState({
        title: '',
        description: ''
      })
      window.location.reload(false);
    } catch (err) {
      console.log(err)
    }

  };

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }

  async function deleteTopic(topicId) {
    try {
        await topicService.removeTopic(topicId);
        getTopics();
    } catch (err) {
        console.log(err)
    }
}

  async function getTopics(){
    try {
      const data = await topicService.getUserTopics(user._id);
      setTopics(data)
    } catch(err){
      console.log(err, ' this is the error')
    }
  }

  useEffect(() => {
    getTopics();
  }, [])


  return (
    <>
  
        <Segment id='elementCont'>
        
            <Form  autoComplete="off" onSubmit={handleAddTopic}>
            <Form.Input
                  className="form-control"
                  name="title"
                  value={state.title}
                  placeholder="topic title"
                  minLength="3"
                  maxLength="11"
                  onChange={handleChange}
                  required
              />
              <Form.Input
                  className="form-control"
                  name="description"
                  value={state.description}
                  placeholder="topic description"
                  minLength="3"
                  maxLength="11"
                  onChange={handleChange}
                  required
              />
        <Grid>
          <Grid.Row style={{ textAlign: 'left' }}>
            <Grid.Column style={{ width: '65%', paddingRight: 0 }}>   
              <Form.Input
                className="form-control"
                type="file"
                name="image"
                placeholder="upload image"
                onChange={handleFileInput}
                required
              />
              </Grid.Column>
            <Grid.Column >   
              <Button
                type="submit"
                className="btn"
              >
                CREATE TOPIC
              </Button>
              </Grid.Column>
          </Grid.Row>
        </Grid>
            </Form>
            </Segment>
            <br />
            
            <Grid>
              <Grid.Column style={{ width: '90%', margin: '10px auto' }}>
                <TopicFeed topics={topics} user={user} location={"form"} deleteTopic={deleteTopic} />
              </Grid.Column>
            </Grid> 
    </>
  ); 
}