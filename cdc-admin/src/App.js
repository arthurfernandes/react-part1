import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';

import AutorBox from './components/Autor';

class App extends Component {

  render() {
    return (
  <div id="layout">
    {/* Menu toggle */}
    <a href="#menu" id="menuLink" className="menu-link">
        { /* Hamburger icon */}
        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <Link className="pure-menu-heading" to="/">Company</Link>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li>
                <li className="pure-menu-item"><Link to="/livros" className="pure-menu-link">Livros</Link></li>
            </ul>
        </div>
    </div>

    <div id="main">
      {this.props.children}        
    </div>
</div>
    );
  }
}

export default App;
