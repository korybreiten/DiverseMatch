import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/App.css';
import Container from '../layouts/Container';
import UserDisplay from '../components/Displays/UserDisplay';
import userService from '../utils/userService';
import topicsService from '../utils/topicService';
import profileService from '../utils/profileService';


function App() {

  const [user, setUser] = useState(userService.getToken());
  const [topics, setTopics] = useState([]);
  const [interests, setInterests] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [matches, setMatches] = useState([]);
  let matchNum = matches.length;

  function handleSignUpOrLogin(){
    setUser(userService.getToken());
    getInterests();
    getDislikes();
    getMatches();
  };

  function handleLogout(){
    userService.logout();
    setUser();
    setInterests([]);
    setDislikes([]);
    setMatches([]);
  };

  async function getTopics(){
    try {
      const data = await topicsService.getAllTopics();
      setTopics(data);
    } catch(err){
      console.log(err, 'Get Topics Error');
    }
  }

  async function getInterests(){
      try {
        const data = await profileService.getAllInterests();
        setInterests(data);
      } catch(err){
        console.log(err, 'Get Interests Error');
      }
    }
  
    async function getDislikes(){
      try {
        const data = await profileService.getAllDislikes();
        setDislikes(data);
      } catch(err){
        console.log(err, 'Get Dislikes Error');
      }
    }

    async function getMatches(){
      try {
        const data = await profileService.getMatches();
        setMatches(data);
      } catch(err){
        console.log(err, 'Get Matches Error');
      }
    }

    async function addInterest(topicId) {
      try {
          await profileService.addInterest(topicId);
          getInterests();
          getMatches();
      } catch (err) {
          console.log(err)
      }
    }
  
    async function deleteInterest(topicId) {
      try {
          await profileService.removeInterest(topicId);
          getInterests();
          getMatches();
      } catch (err) {
          console.log(err)
      }
  }
  
    async function addDislike(topicId) {
      try {
          await profileService.addDislike(topicId);
          getDislikes();
          getMatches();
      } catch (err) {
          console.log(err)
      }
    }
  
    async function deleteDislike(topicId) {
      try {
          await profileService.removeDislike(topicId);
          getDislikes();
          getMatches();
      } catch (err) {
          console.log(err)
      }
  }

    useEffect(() => {
      getInterests();
      getDislikes();
      getTopics();
      getMatches();
    }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={ <Container user={user} topics={topics} interests={interests} dislikes={dislikes} addInterest={addInterest} addDislike={addDislike} deleteInterest={deleteInterest} deleteDislike={deleteDislike} matchNum={matchNum} handleLogout={handleLogout} matches={matches} handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path='/:username' element={<UserDisplay user={user} topics={topics} interests={interests} dislikes={dislikes} addInterest={addInterest} addDislike={addDislike} deleteInterest={deleteInterest} deleteDislike={deleteDislike} matchNum={matchNum} handleLogout={handleLogout}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;