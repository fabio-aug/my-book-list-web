export default class RestApi {
    static URL = 'http://localhost:44390';
    static TOKEN = '';

    static async httpMethod(method, url, body) {
        return fetch(url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this.TOKEN
            },
            body: JSON.stringify(body)
        });
    }

    static httpGet = (url) => this.httpMethod('GET', url).then((res) => res.json());
    static httpPost = (url, body) => this.httpMethod('POST', url, body).then((res) => res.json());
    static httpPut = (url, body) => this.httpMethod('PUT', url, body).then((res) => res.json());
    static httpDelete = (url) => this.httpMethod('DELETE', url).then((res) => res.json());

    static setToken = (token) => this.TOKEN = `Bearer ${token}`;
}
