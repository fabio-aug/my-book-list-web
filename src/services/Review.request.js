import { RestApi } from 'modules';

export default class ReviewRequests {
    static ENDPOINT = `${RestApi.URL}/review`;

    static async GetReviewsByIduser(idUser) {
        return RestApi.httpGet(`${this.ENDPOINT}/getReviewsByIdUser?idUser=${idUser}`).then((response) => response);
    }

    static async DashboardByIdUser(idUser) {
        return RestApi.httpGet(`${this.ENDPOINT}/dashboardByIdUser?idUser=${idUser}`).then((response) => response);
    }

    static async getMostReviewed() {
        return RestApi.httpGet(`${this.ENDPOINT}/getMostReviewed`).then((response) => response);
    }

    static async getBestReviewed() {
        return RestApi.httpGet(`${this.ENDPOINT}/getBestReviewed`).then((response) => response);
    }
    // implementação para bookDetails
    static async getLastReviews() {
        return RestApi.httpGet(`${this.ENDPOINT}/getLastReviews`).then((response) => response);
    }
}
