import { RestApi } from 'modules';

export default class FavoriteRequests {
    static ENDPOINT = `${RestApi.URL}/favorite`;

    static async GetFavoritesListByIduser(idUser) {
        return RestApi.httpGet(`${this.ENDPOINT}/getFavoritesListByIdUser?idUser=${idUser}`).then((response) => response);
    }
}
