import { AppBar, Grid, Toolbar, Divider, Typography, Icon, List, ListItem, ListItemText, IconButton, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Apidoc3 from './apidoc3';
import Apidoc4 from './apidoc4';
import Apidoc5 from './apidoc5';
import nextstack from '../images/nextstack.jpg';
import {
    Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField
} from "@material-ui/core"

export default class Apidocdashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setting: false,
            pass: false,
            emailid: false,
            err: false,
            password: "",
            email: "",
            message: "",
            usertoken: []
        }
    }
    handleClick = (e) => {
        this.setState({
            anchor: e.currentTarget,
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            anchor: null,
            open: false
        })
    }
    userToken = () => {
        localStorage.getItem("user-token") && this.setState({
            usertoken: JSON.parse(localStorage.getItem("user-token")),
        })
    }
    // FUNCTION CALL AFTER CLICKING ON SETTINGS BUTTON
    handleClickSetting = () => {
        this.setState({
            setting: true
        })
    }
    handleCloseSetting = () => {
        this.setState({
            setting: false,
            open: false
        })
    }

    // FUNCTION CALL AFTER CLICKING ON ADD EMAIL-ID BUTTON
    handleClickEmail = () => {
        this.setState({
            emailid: true
        })
    }
    handleCloseEmail = () => {
        this.setState({
            emailid: false,
            setting: false,
            open: false
        })
    }

    // FUNCTION CALL AFTER CLICKING ON CHANGE PASSWORD BUTTON
    handleClickPassword = () => {
        this.setState({
            pass: true
        })
    }
    handleClosePassword = () => {
        this.setState({
            pass: false,
            setting: false,
            open: false
        })
    }
    handleSub = (e) => {
        if (this.state.password !== this.state.confirmpassword) {
            this.setState({
                message: "Not Matching",
                err: true
            })
        } else {
            this.setState({
                message: "Matching",
                err: false
            })
            this.handleRestUser();
        }
    }

    handleAddUser = () => {
        fetch("https://nexdoc-api.herokuapp.com/v1/add_user", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": this.state.email
            })
        })
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({
                    emailid: false,
                    setting: false,
                    open: false
                })
            })

    }

    handleRestUser = () => {
        fetch("https://nexdoc-api.herokuapp.com/v1/reset-password", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "password": this.state.password
            })
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.status === true) {
                    localStorage.clear();
                    window.location.href = '/';
                }
                else {
                    window.location.href = '/apidocdashboard';
                }
            })
    }

    logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }
    render() {
        if (!localStorage.getItem("user-token")) {
            window.location.href = '/';
        }
        return (
            <div><Grid container>
                <Grid item xs={12}>
                    <BrowserRouter>
                        <AppBar style={{ backgroundColor: "white" }}>
                            <Toolbar>
                                <Typography variant="h4" style={{ color: "black" }}><b>NexAPI doc</b></Typography>
                                <IconButton style={{ marginLeft: 1600 }} onClick={this.handleClick}>
                                    <Icon style={{ background: "url(" + nextstack + ")", backgroundSize: "cover" }}>
                                    </Icon>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchor}
                                    keepMounted
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Manage Users</MenuItem>
                                    <MenuItem onClick={this.handleClickSetting} >Setting</MenuItem>
                                    <MenuItem onClick={this.logout} >Logout</MenuItem>
                                </Menu>
                            </Toolbar>
                        </AppBar>
                    </BrowserRouter>
                </Grid>
            </Grid>

                <br />
                <Grid container style={{ marginTop: 55 }} >
                    <Grid item xs={3} md={2.5} >
                        <Apidoc3 />
                    </Grid>
                    <br />
                    <Grid item xs={6} md={6}>
                        <Apidoc4 />
                    </Grid>
                    <br />
                    <Grid item xs={3} md={3.5} >
                        <Apidoc5 />
                    </Grid>
                </Grid>

                <Dialog open={this.state.setting} onClose={this.handleCloseSetting} aria-labelledby="form-dialog-title" fullWidth>
                    <List>
                        <ListItem autoFocus button onClick={this.handleClickEmail}>
                            <ListItemText primary="Add Email-Id" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem autoFocus button onClick={this.handleClickPassword}>
                            <ListItemText primary="Change Password" />
                        </ListItem>
                    </List>
                </Dialog>


                <Dialog open={this.state.emailid} onClose={this.handleCloseEmail} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
                    <DialogTitle id="form-dialog-title"><Typography style={{ color: "grey" }}> Addd Email-id</Typography><br /></DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            color="primary"
                            label="enter your mail"
                            value={this.state.email}
                            required={true}
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                            fullWidth
                        ><br />
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.handleCloseEmail}
                        >
                            Cancel
            </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={(this.state.email === "") ? true : false}
                            onClick={this.handleAddUser}
                        >
                            Submit
            </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.pass} onClose={this.handleClosePassword} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
                    <DialogTitle id="form-dialog-title"><Typography style={{ color: "grey" }}> Change Password</Typography><br /></DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            color="primary"
                            type="password"
                            label="enter your new password"
                            value={this.state.password}
                            required={true}
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                            fullWidth
                        ><br />
                        </TextField>
                    </DialogContent>
                    <br />
                    <DialogContent>
                        <TextField
                            error={this.state.err}
                            variant="outlined"
                            color="primary"
                            type="password"
                            label="enter your Change password"
                            required={true}
                            onChange={(e) => { this.setState({ confirmpassword: e.target.value }) }}
                            fullWidth
                        ><br />
                        </TextField>
                        {this.state.message}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.handleClosePassword}
                        >
                            Cancel
            </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={(this.state.password === "" || this.state.confirmpassword === "") ? true : false}
                            onClick={this.handleSub}
                        >
                            Submit
            </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}