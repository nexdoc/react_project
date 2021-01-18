import { Typography } from '@material-ui/core';
import React from 'react';
import books from '../img/books.jpg';

export default class Apidoc1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div
                style={{
                    background: "url(" + books + ")",
                    height: "100vh",
                    backgroundSize: "cover"
                }}>
                <Typography variant="h1" style={{color: "white", textAlign: 'center', padding:100}}>
                    <b>
                        <i>
                            DOCUMENT YOUR APIS THE SMART WAY
                        </i>
                    </b>
                </Typography>
            </div>
        )
    }
}