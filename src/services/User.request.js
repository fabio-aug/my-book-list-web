import { RestApi } from 'modules';

export default class UserRequests {
    static ENDPOINT = `${RestApi.URL}/user`;

    static async GetUserById(idUSer) {
        return RestApi.httpGet(`${this.ENDPOINT}/getById?id=${idUSer}`).then((response) => response);
    }
}
