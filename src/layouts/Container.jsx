import React from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import WelcomeForm from '../components/Forms/WelcomeForm';
import { Grid } from 'semantic-ui-react';
import '../styles/App.css';



export default function Container({user, topics, interests, dislikes, addInterest, addDislike, deleteInterest, deleteDislike, matchNum, handleLogout, matches, handleSignUpOrLogin}){  
    return (
        <div style={{display: 'inline-block'}}>
            {user ?
                <Grid columns={2}>
                    <Grid.Column id='sidebar'>
                        <Sidebar user={user} topics={topics} interests={interests} dislikes={dislikes} addInterest={addInterest} addDislike={addDislike} deleteInterest={deleteInterest} deleteDislike={deleteDislike} matchNum={matchNum} />
                    </Grid.Column>
                    <Grid.Column id='content'>
                        <Content user={user} handleLogout={handleLogout} matches={matches} />
                    </Grid.Column>
                </Grid>
            :
                <WelcomeForm handleSignUpOrLogin={handleSignUpOrLogin} />
            }
        </div>
        )
}