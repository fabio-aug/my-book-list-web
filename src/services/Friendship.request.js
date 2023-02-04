import { RestApi } from 'modules';

export default class FriendshipRequests {
    static ENDPOINT = `${RestApi.URL}/friendship`;

    static async SearchUserFriendship(idUser, page, itens) {
        return RestApi.httpGet(`${this.ENDPOINT}/searchUserFriendship?idUser=${idUser}&page=${page}&itens=${itens}`).then((response) => response);
    }
}
