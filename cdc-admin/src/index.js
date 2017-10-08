import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AutorBox from './components/Autor';
import LivroBox from './components/Livro';
import Home from './components/Home';

import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter, Switch, Route} from 'react-router-dom'; 

ReactDOM.render(
    (<BrowserRouter>
        <App>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/autor' component={AutorBox} />
                <Route path='/livro' component={LivroBox}/>
            </Switch>
        </App>
     </BrowserRouter>), document.getElementById('root'));

registerServiceWorker();
