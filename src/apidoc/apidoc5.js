import { Typography, Card, CardContent } from '@material-ui/core';
import React from 'react';

export default class Apidoc5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        if(!localStorage.getItem("data")){
            return(
                <div style={{ height: "75vh" }}>
                <Card>
                    <CardContent style={{ textAlign: "left" }}>
                        <Typography style={{ color: "grey" }}>
                            <b>
                                Response
                            </b>
                        </Typography>
                    </CardContent>
                </Card>
                <div style={{
                    backgroundColor: "black", height: "90vh",
                    backgroundSize: "cover"
                }}>
                    <Typography variant="h5" style={{ color: "red",marginLeft:100}}>Please Click on Api!!</Typography>
                    <br />
                </div>
            </div>
            )
        }
        return (
            <div style={{ height: "75vh" }}>
                <Card>
                    <CardContent style={{ textAlign: "left" }}>
                        <Typography style={{ color: "grey" }}>
                            <b>
                                Response
                            </b>
                        </Typography>
                    </CardContent>
                </Card>
                <div style={{
                    backgroundColor: "black", height: "90vh",
                    backgroundSize: "cover"
                }}>
                    <Typography style={{ color: "green" }}>status
                <span style={{ color: "white" }}>:true,</span></Typography>
                    <br />
                    <Typography style={{ color: "green" }}>result
                <span style={{ color: "white" }}>:abc123</span></Typography>
                </div>
            </div>
        )
    }
}