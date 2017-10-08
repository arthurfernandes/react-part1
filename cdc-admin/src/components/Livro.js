import React, {Component} from 'react';
import PubSub from 'pubsub-js';

import InputCustomizado from './InputCustomizado';
import BotaoSubmitCustomizado from './BotaoSubmitCustomizado';

import HttpService from '../services/HttpService';

class FormularioLivro extends Component {
    constructor() {
        super();
        this.state = {titulo: '', preco: '', autorId: ''};

        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
        this.enviaForm = this.enviaForm.bind(this);

        this._httpService = new HttpService();
    }

    setTitulo(event) {
        this.setState({titulo : event.target.value});
    }

    setPreco(event) {
        this.setState({preco : event.target.value});
    }

    setAutorId(event) {
        this.setState({autorId : event.target.value});
    }

    enviaForm(event) {
        event.preventDefault();

        this._httpService.post('http://localhost:8080/api/livros', {
            titulo : this.state.titulo,
            preco : parseInt(this.state.preco),
            autorId : parseInt(this.state.autorId)
        })
        .then( res => res.json())
        .then( novaLista => {
            PubSub.publish('atualiza-lista-livros', novaLista);
        })
        .catch( err => console.log(err));
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
              <InputCustomizado id="titulo" type="text" name="titulo" label="Título" value={this.state.titulo} onChange={this.setTitulo}/>
              <InputCustomizado id="preco" type="text" name="preco" label="Preço" value={this.state.preco} onChange={this.setPreco}/>
              
              <div className="pure-control-group">
                <label htmlFor="nome">Autor</label> 
                <select value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
                    <option value=''>Selecione</option>
                    { this.props.autores.map( autor => 
                         (<option key={autor.id} value={autor.id}>{autor.nome}</option>))
                    }  
                </select>
              </div>

              <BotaoSubmitCustomizado label="Gravar"/>
            </form>             
  
          </div>);
    }
}

class TabelaLivros extends Component {
    render() {
        return (
            <div>            
                <table className="pure-table">
                <thead>
                    <tr>
                    <th>Titulo</th>
                    <th>Preco</th>
                    <th>Autor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.props.lista.map( livro => {
                        return (
                        <tr key={livro.id}>
                            <td> {livro.titulo} </td>
                            <td> {livro.preco} </td>
                            <td> {livro.autor.nome} </td>
                        </tr>);
                    }) 
                    }
                </tbody>
                </table> 
            </div>);
    }
}

class LivroBox extends Component{
    constructor() {
        super();
        this.state = {lista: [], autores: []};
        this._httpService = new HttpService();
    }

    componentDidMount() {
        this._httpService.get('http://localhost:8080/api/livros')
            .then(livros => {
                this.setState({lista: livros})
            })
            .catch(err => console.log(err));

        this._httpService.get('http://localhost:8080/api/autores')
        .then(autores => {
            this.setState({autores: autores})
        })
        .catch(err => console.log(err));

        PubSub.subscribe('atualiza-lista-livros', (topico, novaLista) => {
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
                <FormularioLivro autores={this.state.autores}/>
                <TabelaLivros lista={this.state.lista} />
            </div>   
            </div>);
    }
}

export default LivroBox;