import RequestModel from "../models/request";

export function fetchAllRequests () {
    return RequestModel.find({},
        "content ownerId createdAt updatedAt",
        {
            sort: {
                createdAt: -1,
            }
        }).exec();
}
export function createRequest (request) {
    return new Promise((resolve, reject) => {
        RequestModel.create({
            ownerId: request.ownerId,
            content: request.content,
        }, (error, request) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(request);
        });
    });
}
