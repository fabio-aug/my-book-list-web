import { RestApi } from 'modules';

export default class BookDetailsRequests {
    static ENDPOINT = `${RestApi.URL}/book`;

    static async GetBookById(idBook) {
        return RestApi.httpGet(`${this.ENDPOINT}/getById?id=${idBook}`).then((response) => response);
    }

    static async getLastBooks() {
        return RestApi.httpGet(`${this.ENDPOINT}/getLastBooks`).then((response) => response);
    }

}



