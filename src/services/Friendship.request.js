import { RestApi } from 'modules';

export default class FriendshipRequests {
    static ENDPOINT = `${RestApi.URL}/friendship`;

    static async SearchUserFriendship(idUser, page, itens) {
        return RestApi.httpGet(`${this.ENDPOINT}/searchUserFriendship?idUser=${idUser}&page=${page}&itens=${itens}`).then((response) => response);
    }

    static async VerifyFriendship(idUser1, idUser2) {
        return RestApi.httpGet(`${this.ENDPOINT}/verifyFriendship?idUser1=${idUser1}&idUser2=${idUser2}`).then((response) => response);
    }

    static async CreateFriendship(dto) {
        return RestApi.httpPost(`${this.ENDPOINT}/createFriendship`, dto).then((response) => response);
    }

    static async DeleteFriendship(idUser1, idUser2) {
        return RestApi.httpDelete(`${this.ENDPOINT}/deleteFriendship?idUser1=${idUser1}&idUser2=${idUser2}`).then((response) => response);
    }
}
