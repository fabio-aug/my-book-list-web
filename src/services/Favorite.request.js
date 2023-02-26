import { RestApi } from 'modules';

export default class FavoriteRequests {
    static ENDPOINT = `${RestApi.URL}/favorite`;

    static async GetFavoritesListByIduser(idUser) {
        return RestApi.httpGet(`${this.ENDPOINT}/getFavoritesListByIdUser?idUser=${idUser}`).then((response) => response);
    }

    static async Add(dto) {
        return RestApi.httpPost(`${this.ENDPOINT}/create`, dto).then((response) => response);
    }

    static async Delete(idUser, idBook) {
        return RestApi.httpDelete(`${this.ENDPOINT}/delete?idUser=${idUser}&idBook=${idBook}`).then((response) => response);
    }
}
