import React, { Component } from 'react';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';

import HttpService from './services/HttpService';

import InputCustomizado from './components/InputCustomizado';
import BotaoSubmitCustomizado from './components/BotaoSubmitCustomizado';

class App extends Component {
  constructor(){
    super();
    this.state = {nome: '', email: '', senha: '', lista: []};
    this._httpService = new HttpService();

    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  componentDidMount() {
    this._httpService.get('http://localhost:8080/api/autores')
      .then(autores => {
        this.setState({lista: autores});
      })
      .catch( err => {
        console.log(err);
      });
  }

  setNome(event) {
    this.setState({nome : event.target.value});
  }

  setEmail(event) {
    this.setState({email : event.target.value});
  }

  setSenha(event) {
    this.setState({senha : event.target.value});
  }

  enviaForm(event) {
    event.preventDefault();

    this._httpService.post('http://localhost:8080/api/autores', {
      nome : this.state.nome,
      email : this.state.email,
      senha: this.state.senha})
    .then(res => res.json())
    .then(lista => this.setState({lista : lista}))
    .catch( err => console.log(err));
  }

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
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>
            </ul>
        </div>
    </div>

    <div id="main">
      <div className="header">
          <h1>Cadastro de Autores</h1>
      </div>

      <div className="content" id="content">
        <div className="pure-form pure-form-aligned">
          <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
            <InputCustomizado id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.setNome}/>
            <InputCustomizado id="email" type="email" name="email" label="Email" value={this.state.email} onChange={this.setEmail}/>
            <InputCustomizado id="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.setSenha}/>

            <BotaoSubmitCustomizado label="Gravar"/>
          </form>             

        </div>
        <div>            
          <table className="pure-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.lista.map( autor => {
                  return (
                    <tr key={autor.id}>
                      <td> {autor.nome} </td>
                      <td> {autor.email} </td>
                    </tr>);
                }) 
              }
            </tbody>
          </table> 
        </div> 
      </div>          
    </div>
</div>
    );
  }
}

export default App;
