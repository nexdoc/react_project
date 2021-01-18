import React from 'react';
import { Grid } from '@material-ui/core';
import Apidoc1 from './apidoc1';
import Apidoc2 from './apidoc2';
export default class Apidoclogin extends React.Component {
    render() {
        return (
            <div>
                <Grid container >
                    <Grid item md={6}>
                        <Apidoc1 />
                    </Grid>
                    <br />
                    <Grid item md={6}>
                        <Apidoc2 />
                    </Grid>
                </Grid>
            </div>
        )
    }
}