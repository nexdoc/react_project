import React from 'react';

import Apidoc1 from './apidoc1';
import Apidoc2 from './apidoc2';
import Apidoclogin from './apidoclogin';
import Apidoc3 from './apidoc3';
import Apidoc4 from './apidoc4';
import Apidoc5 from './apidoc5';
import Apidocdashboard from './apidocdashboard';
import{
    BrowserRouter,
    Link,
    Route
} from 'react-router-dom';
export default class Apirouter extends React.Component{
    render(){
        return(
            <BrowserRouter>
            <div>
            <Route exact path="/" component={Apidoclogin} />
            <Route exact path="/apidoc1" component={Apidoc1} />
            <Route exact path="/apidoc2" component={Apidoc2} />
            <Route exact path="/apidoc3" component={Apidoc3} />
            <Route exact path="/apidoc4" component={Apidoc4} />
            <Route exact path="/apidoc5" component={Apidoc5} />
            <Route exact path="/apidocdashboard" component={Apidocdashboard} />
            </div>
            </BrowserRouter>
            )
    }
}