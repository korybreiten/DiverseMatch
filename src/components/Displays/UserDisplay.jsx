import React from 'react';
import {  Image, Grid, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import '../../styles/UserDisplay.css';
import AddTopicForm from '../Forms/AddTopicForm';
import Sidebar from '../../layouts/Sidebar';
import '../../styles/Sidebar.css';


export default function UserDisplay({user, handleLogout, topics, interests, dislikes, addInterest, addDislike, deleteInterest, deleteDislike, matchNum}) { 
  
  return (
    <Grid columns={2}>
      <Grid.Column id='sidebar'>
        <Sidebar user={user} topics={topics} interests={interests} dislikes={dislikes} addInterest={addInterest} addDislike={addDislike} deleteInterest={deleteInterest} deleteDislike={deleteDislike} matchNum={matchNum} />
      </Grid.Column>
      <Grid.Column id='boxCont' style={{ marginTop: '1rem'}}>
        <Grid columns={2} style={{margin: '0 auto'}}>
          <Grid.Column style={{margin: '0 auto'}}>
            <Image id="profImg" src={`${user && user.avatar ? user.avatar : "https://react.semantic-ui.com/images/wireframe/image.png"} `} />
          </Grid.Column>
          <Grid.Column style={{margin: '0 auto'}}>
            <h3>{user ? user.username : 'Username'}</h3>
            <Link to="/"><Button onClick={handleLogout}>Logout</Button></Link>
          </Grid.Column>
        </Grid>
        <AddTopicForm user={user} />
      </Grid.Column>
    </Grid>
  );
}
