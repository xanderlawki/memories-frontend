import React, {useState, useEffect} from 'react';
import useStyles from "../../styles";
import {useDispatch} from "react-redux";
import {getPosts} from "../../actions/posts";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import Posts from '../Posts/post';
import Form from '../Form/form';

const Home = ()=> {
    const [currentid, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(getPosts());
    }, [currentid, dispatch])  
    return (
        <Grow in>
        <Container>
          <Grid container justify="space-between" className={classes.mainContainer} alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Form currentid={currentid} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}


export default Home