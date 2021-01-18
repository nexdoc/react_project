import React from 'react';
import { Button, TextField, Snackbar, IconButton, Card, CardContent, Grid, Typography, InputAdornment } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import google from '../img/google.png';
import { Route, Redirect } from 'react-router-dom';
export default class Apidoc2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      open: false,
      message: "",
      loginSuccess: false,
      showPassword: "password",
      notVisible: false
    }
  }
  handleLogin = () => {
    fetch("https://nexdoc-api.herokuapp.com/v1/signin", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password
      })
    }).then(res => res.json())
      .then((resJson) => {
        if (resJson.userToken) {
          console.log(resJson)
          localStorage.setItem("user-token", JSON.stringify(resJson.userToken));
          this.setState({
            open: true,
            message: "login successful",
            data: resJson.data,
            loginSuccess: true
          })
        } else {
          this.setState({
            open: true,
            message: "login unsuccessful"
          })
        }
      });
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  handlePassword = (e) => {
    this.setState({
      showPassword: "text"
    })
  }
  handlePasswordOpen = () => {
    this.setState({
      showPassword: "password"
    })
  }
  render() {
    if (this.state.loginSuccess === true) {

      return (
        <Route exact path="/">
          <Redirect to="/apidocdashboard" />
        </Route>
      )
    }
    return (
      <div
        style={{
          height: "100vh",
          backgroundSize: 'cover'
        }}>
        <Grid container justify='center'>
          <Grid item xs={12} md={6}>
            <Card style={{ marginTop: 200 }}>
              <CardContent>
                <Typography variant='h4'><b>
                  Welcome To NexAPI doc
                  </b></Typography><br />
                <Typography style={{ color: "grey" }}>Sign in your account</Typography><br />
                <Typography ><b>Email</b></Typography>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="enter your mail"
                  margin="dense"
                  value={this.state.email}
                  required={true}
                  onChange={(e) => { this.setState({ email: e.target.value }) }}
                  fullWidth
                ><br />
                </TextField>
                <br />
                <Typography ><b>Password</b></Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  color="primary"
                  label="enter your password"
                  type={this.state.showPassword}
                  margin="dense"
                  value={this.state.password}
                  required={true}
                  onChange={(e) => { this.setState({ password: e.target.value }) }}
                />
                {this.state.showPassword === "password" ?
                  <IconButton onClick={this.handlePassword} style={{ color: "black", position: "absolute", marginLeft: -50, marginTop: 5, cursor: "pointer" }}>
                    <Icon>
                      visibility_off
                </Icon>
                  </IconButton>
                  :
                  <IconButton onClick={this.handlePasswordOpen} style={{ color: "black", position: "absolute",  marginLeft: -50, marginTop: 5, cursor: "pointer" }}>
                    <Icon>
                      visibility
                </Icon>
                  </IconButton>
                }
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={(this.state.email === "" || this.state.password === "") ? true : false}
                  onClick={this.handleLogin}
                >
                  Sign In
            </Button>
                <br />
                <Typography style={{ color: "grey" }}>
                  Sign in with
              <IconButton>
                    <Icon style={{ backgroundColor: "white", color: "blue" }}>
                      facebook
                </Icon>
                  </IconButton>
                  <IconButton>
                    <Icon style={{ background: "url(" + google + ")", backgroundSize: "cover" }}>
                    </Icon>
                  </IconButton>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={10000}
          onClose={this.handleClose}
          message={this.state.message}
          action={
            <IconButton onClick={this.handleClose}>
              <Icon style={{ color: "white" }}>
                close
              </Icon>
            </IconButton>
          }
        />
      </div>
    )
  }
}