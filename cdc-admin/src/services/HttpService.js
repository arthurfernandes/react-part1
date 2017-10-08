import TratadorDeErros from '../helpers/TratadorDeErros';

class HttpService {
	_handleErrors(res) {
		if (!res.ok) {
            if (res.status === 400) {
				res.json()
					.then(mensagem => {new TratadorDeErros().publicaErros(mensagem.errors)})
					.catch(err => console.log(res.statusText));

                throw new Error(res.statusText);
            }
        }
		return res;
	}

	get(url) {
		return fetch(url)
				.then(res => this._handleErrors(res))
				.then(res => res.json());
	}

	post(url, dado) {
		
		return fetch(url, {
			method: 'post',
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(dado)
			})
			.then(res => this._handleErrors(res));
    }
}

export default HttpService;