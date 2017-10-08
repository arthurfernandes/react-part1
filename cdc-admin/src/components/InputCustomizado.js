import React, {Component} from 'react';
import PubSub from 'pubsub-js';

class InputCustomizado extends Component {
    constructor() {
        super();
        this.state = {errorMessage : ''};
    }

    componentDidMount() {
        PubSub.subscribe('erro-validacao', (topico, erro) => {
            if (erro.field === this.props.name) {
                this.setState({errorMessage : erro.defaultMessage});
            }
        });

        PubSub.subscribe('limpa-erros', topico => {
            this.setState({errorMessage : ''});
        });
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor="nome">{this.props.label}</label> 
                <input {...this.props}/>
                <span className="error">{this.state.errorMessage}</span>
            </div>);
    }
}

export default InputCustomizado;