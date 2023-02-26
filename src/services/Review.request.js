import { RestApi } from 'modules';

export default class ReviewRequests {
    static ENDPOINT = `${RestApi.URL}/review`;

    static async GetReviewsByIduser(idUser) {
        return RestApi.httpGet(`${this.ENDPOINT}/getReviewsByIdUser?idUser=${idUser}`).then((response) => response);
    }

    static async GetReviewByIds(idUser, idBook) {
        return RestApi.httpGet(`${this.ENDPOINT}/getByIds?idUser=${idUser}&idBook=${idBook}`).then((response) => response);
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
    
    static async GetLastReviews(idBook) {
        return RestApi.httpGet(`${this.ENDPOINT}/getLastReviews?idBook=${idBook}`).then((response) => response);
    }

    static async CreateReview(dto) {
        return RestApi.httpPost(`${this.ENDPOINT}/create`, dto).then((response) => response);
    }

    static async UpdateReview(dto) {
        return RestApi.httpPut(`${this.ENDPOINT}/update`, dto).then((response) => response);
    }
}
