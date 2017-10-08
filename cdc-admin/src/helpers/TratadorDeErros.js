import PubSub from 'pubsub-js';

export default class TratadorDeErros {
    publicaErros(erros) {
        erros.forEach( erro => {
            PubSub.publish('erro-validacao', erro);
        });
    }
}