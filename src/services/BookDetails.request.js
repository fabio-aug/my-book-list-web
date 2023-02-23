import { RestApi } from 'modules';

export default class BookDetailsRequests {
    static ENDPOINT = `${RestApi.URL}/bookDetails`;

    // implementação para bookdetails book
    static async GetBookById(idBook) {
        return RestApi.httpGet(`${this.ENDPOINT}/getById?id=${idBook}`).then((response) => response);
    }

    // implementação para bookDetails review
    static async getLastReviews() {
        return RestApi.httpGet(`${this.ENDPOINT}/getLastReviews`).then((response) => response);
    }

}



