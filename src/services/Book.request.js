import { RestApi } from 'modules';

export default class BookRequests {
    static ENDPOINT = `${RestApi.URL}/book`;

    static async SearchBook(searchTerm, page, itens) {
        const term = searchTerm ? `term=${searchTerm}&` : '';

        return RestApi.httpGet(`${this.ENDPOINT}/searchBook?${term}page=${page}&itens=${itens}`).then((response) => response);
    }

    static async getLastBooks() {
        return RestApi.httpGet(`${this.ENDPOINT}/getLastBooks`).then((response) => response);
    }
        // implementação para bookdetails
    static async GetBookById(idBook) {
        return RestApi.httpGet(`${this.ENDPOINT}/getById?id=${idBook}`).then((response) => response);
    }

}
