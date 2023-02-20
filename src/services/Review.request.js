import { RestApi } from 'modules';

export default class ReviewRequests {
    static ENDPOINT = `${RestApi.URL}/review`;

    static async GetReviewsByIduser(idUser) {
        return RestApi.httpGet(`${this.ENDPOINT}/getReviewsByIdUser?idUser=${idUser}`).then((response) => response);
    }

    static async DashboardByIdUser(idUser) {
        return RestApi.httpGet(`${this.ENDPOINT}/dashboardByIdUser?idUser=${idUser}`).then((response) => response);
    }
}
