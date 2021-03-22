import React, {useEffect, useState} from 'react';
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import memories from './images/memories.png';

import { Nav } from '../src/Components/Nav/Nav'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Components/Home/home';
import Auth from './Components/Auth/auth';


const App = ()=> {
  
  return (
    <BrowserRouter>
    <Container maxidth="lg">
      <Nav />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/auth' exact component={Auth} />  
      </Switch>
      </Container>
      </BrowserRouter>
  )
}

export default App