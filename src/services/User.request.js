import { RestApi } from 'modules';

export default class UserRequests {
    static ENDPOINT = `${RestApi.URL}/user`;

    static async Login(dto) {
        return RestApi.httpPost(`${this.ENDPOINT}/login`, dto).then((response) => response);
    }

    static async Create(dto) {
        return RestApi.httpPost(`${this.ENDPOINT}/create`, dto).then((response) => response);
    }

    static async GetUserById(idUSer) {
        return RestApi.httpGet(`${this.ENDPOINT}/getById?id=${idUSer}`).then((response) => response);
    }
}
