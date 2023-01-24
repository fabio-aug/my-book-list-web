import { RestApi } from 'modules';

export default class BookRequests {
    static ENDPOINT = `${RestApi.URL}/Book`;

    static async SearchBook(searchTerm, page, itens) {
        const term = searchTerm ? `searchTerm=${searchTerm}&` : '';

        return RestApi.httpGet(`${this.ENDPOINT}/Search?${term}page=${page}&itens=${itens}`).then((response) => response);
    }
}
