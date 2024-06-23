import http from "@/config/request";
export const confCreate = (server,data) => {
    return new Promise((resolve, reject) => {
        http.post("http://"+ server +"/ea//config/create", data).then((res) => {
            resolve(res);
        });
    });
}