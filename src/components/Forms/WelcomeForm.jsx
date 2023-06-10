import React, { useState } from 'react';
import ErrorMessage from '../System/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import userService from '../../utils/userService';
import imageService from '../../utils/imageService';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/DIverseMatch_Logo.png';


export default function SignupForm(props){
  const [invalidForm] = useState(false);
  const [logError, setLoginError ] = useState('');
  const [signError, setSignupError ] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [logState, setLogState]  = useState({
    username: '',
    password: ''
  });
  const [signState, setSignState]  = useState({
    username: '',
    password: '',
    passwordConf: ''
  });
  const navigate = useNavigate();
  
  function handleLogChange(e){
    setLogState({
      ...logState,
      [e.target.name]: e.target.value,
    })
  }

  function handleSignChange(e){
    setSignState({
      ...signState,
      [e.target.name]: e.target.value
    })
  }

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }

  async function handleLogin(e){
    e.preventDefault()
            
    try {
        await userService.login(logState);
        // Route to wherever you want!
        props.handleSignUpOrLogin() // 
        window.location.reload(false);
        
      } catch (err) {
        // Invalid user data (probably duplicate email)
        setLoginError(err.message)
      }
  }

  async function handleSignup(e){
    e.preventDefault();
    try {
      if (selectedFile) {
        let imageData = new FormData();
        imageData.append('image', selectedFile);
        const location = await imageService.saveImage(imageData)
        await userService.join({
          username: signState.username,
          password: signState.password,
          email: signState.username + '@diversematch.com',
          avatar: location
        });
      } else {
        await userService.join({
          username: signState.username,
          password: signState.password,
          email: signState.username + '@diversematch.com'
        });
        
      }
      window.location.reload(false);

    } catch(err){
      console.log(err.message)
      setSignupError(err.message)
    }

  }


    
  return (
    <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }} >            
          
          <Grid.Row >
            <Grid.Column style={{ maxWidth: "35%", float: "left" }} verticalAlign='top'>
              <Segment id="boxCont" >
                <Image src={logo} />
              </Segment>
              <Segment id="elementCont">
              <Header as='h2' color='teal' textAlign='center'>
                Welcome!
              </Header>
              <Form  autoComplete="off" onSubmit={handleLogin}>
                  <Form.Input
                    name="username"
                    placeholder="username"
                    value={logState.username}
                    onChange={handleLogChange}
                    required
                  />
                  <Form.Input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={logState.password}
                    onChange={handleLogChange}
                    required
                  />
                <Button
                  color='teal'
                  fluid size='large'
                  type="submit"
                  className="btn"
                  disabled={invalidForm}
                >
                  {logError ? <ErrorMessage error={logError} /> : "Login"}
                </Button>
                
            </Form>
                  </Segment>

            </Grid.Column>
            <Grid.Column style={{ maxWidth: "63%", textAlign: "right", float: "right" }} >
              <Segment id="elementCont">
              <Header as='h2' color='teal' textAlign='center'>
            New User?
          </Header>
                <Form autoComplete="off"  onSubmit={handleSignup}>
                  <Form.Input                    
                    name="username"
                    placeholder="username"
                    value={signState.username}
                    onChange={handleSignChange}
                    required
                  />
                  <Form.Input             
                    name="password"
                    type="password"
                    placeholder="password"
                    value={signState.password}
                    onChange={handleSignChange}
                    required
                  />
                  <Form.Input     
                    name="passwordConf"
                    type="password"
                    placeholder="Confirm Password"
                    value={signState.passwordConf}
                    onChange={handleSignChange}
                    required
                  />
                  <Form.Field> 
                    <Form.Input
                      type="file"
                      name="image"
                      placeholder="upload image"
                      onChange={handleFileInput}
                    />      
                  </Form.Field>
                  
                  <Button
                    color="purple"
                    fluid size="large"
                    type="submit"
                    className="btn"
                    disabled={invalidForm}
                  >
                    {signError ? <ErrorMessage error={signError} /> : "Signup"}
                  </Button>
                  
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      </Grid>        
    </div>
  );   
    
}