import { RestApi } from 'modules';

export default class ExempleRequests {
    static ENDPOINT = `${RestApi.URL}/Exemple`;

    static async Exemple() {
        return RestApi.httpGet(`${this.ENDPOINT}/GetAll`).then((response) => response);
    }
}
