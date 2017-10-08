import React, {Component} from 'react';
import PubSub from 'pubsub-js';

import InputCustomizado from './InputCustomizado';
import BotaoSubmitCustomizado from './BotaoSubmitCustomizado';

import HttpService from '../services/HttpService';

class FormularioAutor extends Component{
    constructor() {
        super();
        this.state = {nome: '', email: '', senha: ''};

        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);

        this._httpService = new HttpService();
    }

    _cleanForm() {
        this.setState({nome: '', email: '', senha: ''});
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
        .then(novaLista => {
            PubSub.publish('atualiza-lista-autores', novaLista);
            this._cleanForm();
        })
        .catch( err => console.log(err));
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
              <InputCustomizado id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.setNome}/>
              <InputCustomizado id="email" type="email" name="email" label="Email" value={this.state.email} onChange={this.setEmail}/>
              <InputCustomizado id="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.setSenha}/>
  
              <BotaoSubmitCustomizado label="Gravar"/>
            </form>             
  
          </div>);
    }
}

class TabelaAutores extends Component{

    render() {
        return (
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
                    this.props.lista.map( autor => {
                        return (
                        <tr key={autor.id}>
                            <td> {autor.nome} </td>
                            <td> {autor.email} </td>
                        </tr>);
                    }) 
                    }
                </tbody>
                </table> 
            </div>);
    }
}


class AutorBox extends Component {
    constructor() {
        super();
        this.state = {lista : []};
        this._httpService = new HttpService();
    }

    componentDidMount() {
        this._httpService.get('http://localhost:8080/api/autores')
          .then(autores => {
            this.setState({lista: autores});
          })
          .catch( err => {
            console.log(err);
          });

        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => {
            this.setState({lista : novaLista});
        });
    }

    render() {
        return (
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista}/>
            </div>);
    }
}

export default AutorBox;