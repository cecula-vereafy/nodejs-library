/**
 * How to use this library
 * first download the library into your project directory
 * Install request
 * Call any of the function you want to use in your file and put in the parameters and a callabck function
 * The parameters are passed as dataObj and are inputed in a JSON format /({"mobile":"23470xxxxxx"})/
 *
 */
const request = require("request");
const vereafy = {};
vereafy.apiKey = ""; // api key goes in here

/**
 * this is the request function, it takes 2 parameter the endpont(url) and the body of the request
 * this request covers the initialization, resend and complete process
 * this uses a post method for the request
 */
vereafy._api = (endPoint, jsonData, requestMethod, timeoutLimit = 30000) => {
    return new Promise((resolve, reject) => {
        var options = {
            url: "https://api.cecula.com/" + endPoint, // cecula url
            method: requestMethod,
            headers: {
                "Authorization": "Bearer " + vereafy.apiKey,
                "cache-control": "no-cache"
            },
            timeout: timeoutLimit
        };

        if (["POST", "PUT", "OPTIONS", "PATCH"].indexOf(requestMethod) > -1) {
            options.headers.Accept = "application/json";
            options.headers["Content-Type"] = "application/json";
            options.json = jsonData;
        }

        request(options, (error, res, data) => {
            if (error) {
                resolve(error);
                return;
            }

            // convert the response to an object if it didnt come as an object
            let result = typeof data === "object" ? data : JSON.parse(data);
            resolve(result);
        });
    });
};

/***
 * the initialization function
 * it requires the mobile number you want to initialize in a json format
 */
vereafy.init = (dataObj, callback) => {
    vereafy._api("twofactor/init", dataObj, "POST").then((result) => {
        return callback(result);
    });
};

/***
 * the resend function
 * it requires pinReference and mobile number you want to resend the code to in a json format
 */
vereafy.resend = (dataObj, callback) => {
    return vereafy._api("twofactor/resend", dataObj, "POST").then((result) => {
        callback(result);
    });
};

/***
 * the complete function
 * it requires the pinReference and token in a json format
 */
vereafy.complete = (dataObj, callback) => {
    return vereafy._api("twofactor/complete", dataObj, "POST").then((result) => {
        callback(result);
    });
};

vereafy.getBalance = (callback) => {
    return vereafy._api("account/tfabalance", "", "GET").then((result) => {
        callback(result);
    });
};
module.exports = vereafy;
