import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AutorBox from './components/Autor';
import Home from './components/Home';

import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter, Switch, Route, IndexRoute} from 'react-router-dom'; 

ReactDOM.render(
    (<BrowserRouter>
        <App>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/autor' component={AutorBox} />
                <Route path='/livro' />
            </Switch>
        </App>
     </BrowserRouter>), document.getElementById('root'));

registerServiceWorker();
