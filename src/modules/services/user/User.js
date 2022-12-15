import Api from "../../api/Api";

export default class UserRequest {
    static URL_USER = `${Api.URL}/User`;

    static Login(dto) {
        return Api.httpPost(`${UserRequest.URL_USER}/Auth`, dto).then((response) => response);
    }
}
