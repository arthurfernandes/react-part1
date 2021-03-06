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

        this._httpService = new HttpService();
    }

    _cleanForm() {
        this.setState({nome: '', email: '', senha: ''});
    }

    salvaAlteracao(nomeInput, event) {
        this.setState({[nomeInput] : event.target.value});
    }

    enviaForm(event) {
        event.preventDefault();

        PubSub.publish('limpa-erros', {});

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
              <InputCustomizado id="nome" type="text" name="nome" label="Nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')}/>
              <InputCustomizado id="email" type="email" name="email" label="Email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')}/>
              <InputCustomizado id="senha" type="password" name="senha" label="Senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this, 'senha')}/>
  
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
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>

                <div className="content" id="content">
                    <FormularioAutor />
                    <TabelaAutores lista={this.state.lista}/>
                </div>   
            </div>);
    }
}

export default AutorBox;