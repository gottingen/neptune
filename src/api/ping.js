import axios from "axios/dist/axios";
export const httpPing = (server)  => {
        try {
           axios.get('http://' + server + '/ea', {timeout: 1000,validateStatus: function (status) {
                    return status < 500; // Resolve only if the status code is less than 500
                }}).then((response) => {
               return true;
           } ).catch((error) => {
               return false;
           });
        } catch (error) {
            return false;
        }
};
