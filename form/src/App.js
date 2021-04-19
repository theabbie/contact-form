import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    margin: 'auto',
    maxWidth: 800
  },
  form: {
    padding: 20,
    marginTop: 200,
    textAlign: 'center'
  },
  txt: {
    width: '80%',
    maxWidth: 400,
    margin: 20
  },
  msg: {
    padding: 20,
    width: '80%',
    maxWidth: 400,
    margin: 20
  },
  btn: {
    display: 'block',
    margin: 'auto',
    color: 'black'
  },
  err: {
    padding: 20,
    color: "red",
    margin: 20
  }
}));

function App() {

  const [email,setEmail] = useState(null);
  const [message,setMessage] = useState(null);
  const [err,setErr] = useState(null);

  const classes = useStyles();

  function submit() {
    if (!email) {
      setErr("Email Required");
      return;
    }
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      setErr("Email Invalid");
      return;
    }
    if (!message) {
      setErr("Message Required");
      return;
    }
    setErr(null);
    axios({
      url: "https://apitest-54hz5zwp7oxa.runkit.sh/",
      method: "POST",
      data: { email, message }
    }).then(console.log).catch(console.log);
  }

  return (
    <Grid container xs justify="center" className={classes.container}>
      <Grid item xs>
        <Paper variant="outlined" className={classes.form}>
          <Typography variant="h4">
            Contact Form
          </Typography>
          <TextField id="outlined-basic" label="Email" variant="outlined" className={classes.txt} onChange={e=>setEmail(e.target.value)} />
          <TextareaAutosize rowsMin={5} className={classes.msg} placeholder="Your Message" onChange={e=>setMessage(e.target.value)} />
          <Paper variant="outlined" className={classes.err} style={{ display: err?"":"none" }}>
            {err}
          </Paper>
          <Button variant="outlined" color="primary" className={classes.btn} onClick={submit}>
            SUBMIT
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;