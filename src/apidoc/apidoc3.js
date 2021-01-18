import {
    Card, List,
    ListItem,
    ListItemAvatar, Select,
    FormControl, InputLabel,
    ListItemText, CardContent, Menu, MenuItem, Snackbar,Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Icon, Typography, Button, IconButton, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Grid, TextField, Tab, Tabs, Paper, MenuList
} from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, BrowserRouter, Route } from 'react-router-dom';
export default class Apidoc3 extends React.Component {
    useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            result: [],
            menuOpen: false,
            selectValue: "",
            errorMessage: "",
            project_name: "",
            selectType: "",
            selectMethod: "",
            path_name: "",
            method: "",
            param: "",
            project_id: "",
            api_id: "",
            anchor: null,
            open: false,
            setOpen: false,
            openPlus: false,
            header: false,
            project: false,
            menu: false,
            usertoken: [],
            value: 0,
            param_name: "",
            param_value: "",
            param_type: "",
            add_param: []
            //         arr:[{
            //             name:"Project",
            //             num:1
            //         },
            //     {
            //         name:"Project",
            //         num:2
            //     },
            //    {
            //     name:"Project",
            //     num:3
            //     }]localStorage.getItem("user-token")

        }
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDropdownType = this.handleDropdownType.bind(this);
        this.handleDropdownMethod = this.handleDropdownMethod.bind(this);
    }
    clearData = () => {
        this.setState({
            menuOpen: false,
            anchor: null,
            project_name: "",
            path_name: "",
            selectType: "",
            selectMethod: "",
            method: "",
            param: "",
            project_id: "",
            api_id: "",
            open: false,
            setOpen: false,
            openPlus: false,
            header: false,
            project: false,
            menu: false,
            add: null,
            button: null,
            complete: null,
            arr: [],
            usertoken: [],
            value: 0,
            param_name: "",
            param_value: "",
            param_type: "",
            add_param: []

        })
    }

    handleDropdownChange(e) {
        this.setState({
            selectValue: e.target.value
        });
    }

    handleDropdownType(e) {
        this.setState({
            selectType: e.target.value,
        });

    }
    handleDropdownMethod(e) {
        this.setState({
            selectMethod: e.target.value
        });

    }
    handleProjectname = () => {
        fetch("https://nexdoc-api.herokuapp.com/v1/get_project", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                this.setState({
                    data: resJson.project_name
                })
                // const options = this.state.data.map(d => ({
                //     "value" : d.project_id,
                //     "label" : d.project_name
                //   }))
                //   this.setState({selectOptions: options})
            })

    }

    handleProjectadd = () => {
        fetch("https://nexdoc-api.herokuapp.com/v1/add_project", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "project_name": this.state.project_name,
            })
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                this.setState({
                    project: false,
                    menuOpen: false,
                })
            })
    }
    handleAdd = () => {
        var add = this.state.add_param;
        add.push({
            paramName: this.state.param_name,
            paramValue: this.state.param_value,
            paramType: this.state.selectType
        });
        this.setState({
            add_param: add
        });
    }
    handleGetApi = () => {
        fetch("https://nexdoc-api.herokuapp.com/v1/get_api", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "project_id": this.state.selectValue,
            })
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                if (resJson.status === true) {
                    this.setState({
                        result: resJson.result

                    })
                }
                else {
                    this.setState({
                        result: [],
                        errorMessage: 'No Api Found!!'

                    })
                }
            })

    }

    handleDeleteApi = () => {
        fetch("https://nexdoc-api.herokuapp.com/v1/delete_api_project", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "api_id": this.state.api_id,
            })
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                this.handleGetApi();
                this.setState({
                    open:false
                })
            })

    }
    handleCloseOpen = () => {
        this.setState({
            open: false
        })
    }

    handleApiadd = (e) => {
        fetch("https://nexdoc-api.herokuapp.com/v1/add_api_project", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'user-token': this.state.usertoken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "project_id": this.state.selectValue,
                "path_name": this.state.path_name,
                "method": this.state.selectMethod,
                "param": this.state.add_param,
            })
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson.param);
                this.clearData();
            })
            .catch(error => {
                if (error) {
                    console.log("Error");
                }
            });

    }
    // FUNCTION CALL AFTER CLICKING ON MENU ICON BUTTON
    componentDidMount() {
        this.handleProjectname()
    }
    handleClose = () => {
        this.setState({
            anchor: null,
            menuOpen: false

        })
    }
    handleClick = (e) => {
        this.setState({
            anchor: e.currentTarget,
            menuOpen: true,

        })
    }

    handleChange = (e) => {
        this.setState({
            setproject_name: e.target.value,

        })
    }
    userToken = () => {
        localStorage.getItem("user-token") && this.setState({
            usertoken: JSON.parse(localStorage.getItem("user-token")),
        })
    }
    // FUNCTION CALL AFTER CLICKING ON DELRTE BUTTON
    handleClickOpen = () => {
        this.setState({
            setOpen: true,
        })
    };
    handleCloseSet = () => {
        this.setState({
            setOpen: false,
        })
    };
    // FUNCTION CALL AFTER CLICKING ON MENU ICON BUTTON
    handleClickOpenPlus = () => {
        this.setState({
            openPlus: true
        })
    };
    handleClosePlus = () => {
        this.setState({
            openPlus: false
        })
    };
    // FUNCTION CALL AFTER CLICKING ON PLUS BUTTON
    handleCloseHeader = () => {
        this.setState({
            header: false
        })
    };
    handleClickHeader = () => {
        this.setState({
            header: true
        })
    }
    // FUNCTION CALL AFTER CLICKING ON ADD PROJECT BUTTON
    handleClickProject = () => {
        this.setState({
            project: true
        })
    }
    handleCloseProject = () => {
        this.setState({
            project: false,
            menuOpen: false,
        })
    }

    // FUNCTION CALL AFTER CLICKING ON METHOD BUTTON
    handleCloseMenu = () => {
        this.setState({
            menu: false,
            anchor: null
        })
    }
    handleClickMenu = (e) => {
        this.setState({
            menu: true,
            anchor: e.currentTarget

        })
    }

    handleVal = (e, val) => {
        this.setState({
            value: val
        })
    }

    edit = (data) => {
        localStorage.setItem("data", JSON.stringify(data));
    }

    render() {
        // if (Object.keys(this.state.selectValue).length == 0) {
        //   }else{
        //       this.handleGetApi();
        //   }
        return (
            <div style={{ height: "75vh" }}>
                <Select style={{ width: "200px" }}
                    variant="outlined"
                    color="primary"
                    label="Project"
                    onChange={this.handleDropdownChange}
                    margin="dense"
                >
                    {this.state.data.map((s) => {
                        return (
                            <MenuItem value={s.project_id} >{s.project_name}</MenuItem>
                        )
                    })}
                    <MenuItem onClick={this.handleClickProject}>Add new Project</MenuItem>
                </Select>
                <Button style={{ marginLeft: 20 }} variant="contained" color="primary" onClick={this.handleGetApi}>Show Api's</Button>
                <IconButton size="medium" onClick={this.handleClickOpenPlus}>
                    <Icon>
                        control_point
                            </Icon>
                </IconButton>
                <br />
                {/* DELETION PART */}
                <BrowserRouter>
                    {this.state.errorMessage &&
                        <h3 className="error" style={{ color: "red", marginLeft: 20 }}> {this.state.errorMessage} </h3>}
                    <List>
                        {this.state.result.map((s) => {
                            return (
                                <div>
                                    <ListItem>
                                        <Button style={{ backgroundColor: "blue", color: "white", marginRight: 60 }}>{s.method}</Button>
                                        <ListItemText style={{ marginLeft: 20 }} hidden>{s._id}</ListItemText>
                                        <Link style={{ marginLeft: 20, color: "black", textDecoration: "none" }} onClick={() => this.edit(s)} >{s.path_name}</Link>
                                        <IconButton style={{ marginRight: 190 }} onClick={() => {this.setState({api_id:s._id})}}>
                                            <Icon>
                                                delete
                                            </Icon>
                                        </IconButton>
                                    </ListItem>
                                </div>
                            )
                        })}
                    </List>
                </BrowserRouter>
                {/* AFTER CLICKING ON DELETE BUTTON */}
                <Dialog open={this.state.setOpen} onClose={this.handleCloseSet} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogTitle id="form-dialog-title">DELETE API</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to permanently delete this api?
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseSet} color="primary">
                            CANCEL
                            </Button>
                        <Button onClick={this.handleDeleteApi} color="primary">
                            DELETE
                            </Button>
                    </DialogActions>
                </Dialog>
                <br />
                {/* AFTER CLICKIN ON PLUS BUTTON */}
                <Dialog open={this.state.openPlus} onClose={this.handleClosePlus} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
                    <DialogTitle id="form-dialog-title">ADD API</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    color="primary"
                                    label="Path Name"
                                    margin="dense"
                                    value={this.state.path_name}
                                    fullWidth
                                    onChange={(e) => { this.setState({ path_name: e.target.value }) }} />
                                <br />
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        color="primary"
                                        label="Method"
                                        margin="dense"
                                        fullWidth
                                        onChange={this.handleDropdownMethod}
                                        select>
                                        <MenuItem value="GET">GET</MenuItem>
                                        <MenuItem value="POST">POST</MenuItem>
                                        <MenuItem value="PUT">PUT</MenuItem>
                                        <MenuItem value="DELETE">DELETE</MenuItem>
                                    </TextField>
                                </Grid>

                                <Card style={{ textAlign: "center", backgroundColor: "lightgrey" }}>
                                    <CardContent>
                                        <TextField
                                            variant="outlined"
                                            color="primary"
                                            label="Param"
                                            margin="dense"
                                            fullWidth
                                            onChange={(e) => { this.setState({ param_name: e.target.value }) }}
                                            style={{ backgroundColor: "white" }} /><br />
                                        <TextField
                                            variant="outlined"
                                            color="primary"
                                            label="Value"
                                            margin="dense"
                                            fullWidth
                                            onChange={(e) => { this.setState({ param_value: e.target.value }) }}
                                            style={{ backgroundColor: "white" }} /><br />
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                color="primary"
                                                label="Method"
                                                margin="dense"
                                                fullWidth
                                                onChange={this.handleDropdownType}
                                                select>
                                                <MenuItem value="Body">Body</MenuItem>
                                                <MenuItem value="Header">Header</MenuItem>
                                                <MenuItem value="Response">Response</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <br />
                                        <br />
                                        <Button textAlign="center" fullWidth style={{ backgroundColor: "white" }} onClick={this.handleAdd}>
                                            ADD PARAM
                                </Button>
                                    </CardContent></Card>
                            </Grid>

                            <br />
                            <Grid item xs={5} style={{ marginLeft: 30 }}>
                                <Paper square>
                                    <Tabs
                                        value={this.state.value}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        onChange={this.handleVal}
                                        aria-label="disabled tabs example"
                                    >
                                        <Tab label="Headers" />
                                        <Tab label="Body" />
                                        <Tab label="Response" />
                                    </Tabs>
                                </Paper>
                                <TabPanel value={this.state.value} index={0}>
                                    <TableContainer component={Paper}>

                                        <Table aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Param</TableCell>
                                                    <TableCell align="right">Value</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.add_param.map((s) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell>{s.paramName}</TableCell>
                                                            <TableCell align="right">{s.paramValue}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                                <TabPanel value={this.state.value} index={1}>
                                    <TableContainer component={Paper}>

                                        <Table aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Param</TableCell>
                                                    <TableCell align="right">Value</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.add_param.map((s) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell>{s.paramName}</TableCell>
                                                            <TableCell align="right">{s.paramValue}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                                <TabPanel value={this.state.value} index={2}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Param</TableCell>
                                                    <TableCell align="right">Value</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.add_param.map((s) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell>{s.paramName}</TableCell>
                                                            <TableCell align="right">{s.paramValue}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClosePlus} color="primary">
                            CANCEL
                            </Button>
                        <Button onClick={this.handleApiadd} color="primary">
                            ADD
                            </Button>
                    </DialogActions>
                    {/* </Card> */}
                </Dialog>
                <br />
                {/* AFTER CLICKING ON HEADER TAB */}
                <Dialog open={this.state.header} onClose={this.handleCloseHeader} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogContent>
                        <Card>
                            <Grid container>
                                <Grid item md={10}>
                                    <CardContent style={{ backgroundColor: "lightgrey" }}>
                                        <Typography>Param1</Typography>
                                    </CardContent>
                                </Grid>
                                {/* <br /> */}
                                <Grid item md={10}>
                                    <CardContent style={{ backgroundColor: "lightgrey" }}>
                                        <Typography>
                                            value
                                </Typography>
                                    </CardContent>
                                    <DialogActions>
                                        <Button onClick={this.handleCloseHeader} color="primary">
                                            OK
                        </Button>
                                    </DialogActions>
                                </Grid>
                            </Grid>
                        </Card>
                    </DialogContent>
                </Dialog>
                <br />
                {/* AFTER CLICKING ON ADD NEW PROJECT */}
                <Dialog open={this.state.project} onClose={this.handleCloseProject} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogTitle id="form-dialog-title">ADD PROJECT</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            color="primary"
                            label="Project Name"
                            margin="dense"
                            value={this.state.project_name}
                            fullWidth
                            onChange={(e) => { this.setState({ project_name: e.target.value }) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseProject} color="primary">
                            CANCEL
                            </Button>
                        <Button onClick={this.handleProjectadd} color="primary">
                            ADD
                            </Button>
                    </DialogActions>
                </Dialog>
                {/* <div>
                    <ol>
                        {this.state.data.map((s) => {
                            return (
                                <div>
                                    <li>
                                        <List className={this.state.root}>
                                            <ListItem>
                                                <ListItemText primary={s.project_name}/>
                                            </ListItem>
                                        </List>

                                    </li>

                                </div>
                            )
                        })}

                    </ol>
                </div>
                    <Button onClick={this.handleGetApi} variant="contained" color="primary">
                        GET DATA
                    </Button>}*/}
            </div>

        )
    }
}

function TabPanel(props) {
    const { children, value, index } = props
    return (
        <div>
            {value == index && (<h1>{children}</h1>)}

        </div>
    )
}