import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Image, Grid } from 'semantic-ui-react';
import TopicSearch from '../components/Search/TopicSearch';
import ProfileDisplay from '../components/Displays/ProfileDisplay';
import '../styles/Sidebar.css';
import logo from '../images/DIverseMatch_Logo.png';

export default function Sidebar({user, interests, dislikes, addInterest, addDislike, deleteInterest, deleteDislike, matchNum}){

    return (
            <Segment id="boxCont">
                <Grid>
                    <Grid.Column>
                        <Link to="/"><Image id="logoImg" src={logo} /></Link>
                        {user !== null ?
                        <>
                        <Link to={user ? '/' + user.username : '/'}>
                            <Image id="avatarImg" src={user && user.avatar ? user.avatar : "https://react.semantic-ui.com/images/wireframe/square-image.png"}></Image>
                        </Link>
                            <div id="matchNumCont" >
                                <Link to="/"><div id="matchNum">{matchNum}</div></Link>
                            </div>
                        </>
                        :
                        <Link to="/">
                        <Image id="avatarImg" src="https://react.semantic-ui.com/images/wireframe/square-image.png"></Image>
                        </Link>
                        }
                    </Grid.Column>
                </Grid>
                <Segment id="elementCont">
                    <Grid>
                        <Grid.Column>
                            <Grid.Row>
                                <ProfileDisplay user={user} interests={interests} dislikes={dislikes} deleteInterest={deleteInterest} deleteDislike={deleteDislike} />
                            </Grid.Row>
                            <Grid.Row id="searchBox">
                                <TopicSearch addInterest={addInterest} addDislike={addDislike} />
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Segment>
            
    )
}