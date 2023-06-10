import React from 'react';
import {  Grid, Segment } from 'semantic-ui-react'
import UserDisplay from '../components/Displays/UserDisplay';
import AddTopicForm from '../components/Forms/AddTopicForm';
import MatchFeed from '../components/Feeds/MatchFeed';


export default function Content({user, handleLogout, matches}){  

    return (
      <Segment id="boxCont">
        <Segment id="elementCont">
          <h2><strong>Match Results</strong></h2>
          <br />
          <MatchFeed matches={matches} />
          <br />
        </Segment>

      </Segment>
    )
}