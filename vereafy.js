/**
 * How to use this library
 * first download the library into your project directory
 * Install request
 * Call any of the function you want to use in your file and put in the parameters and a callabck function
 * The parameters are passed as dataObj and are inputed in a JSON format /({"mobile":"23470xxxxxx"})/
 * 
 */
const request = require('request')
const vereafy = {}
vereafy.apiKey = '' //api key goes in here

/**
 * this is the request function, it takes 2 parameter the endpont(url) and the body of the request
 * this request covers the initialization, resend and complete process
 * this uses a post method for the request
 */
vereafy._api = (endPoint, jsonData, method)=>{
    return new Promise(resolve=>{
        if(method === 'GET'){
            var options = {
                url: 'https://api.cecula.com/account/'+endPoint,// cecula url
                method: 'GET',
                headers:{
                "Authorization": "Bearer "+vereafy.apiKey
                }
            }
        }else{
            var options = {
                url: 'https://api.cecula.com/twofactor/'+endPoint,// cecula url
                method: 'POST',
                headers:{
                    "Content-Type": "application/json", 
                    "Accept": "application/json",
                    "Authorization": "Bearer "+vereafy.apiKey,
                    "cache-control": "no-cache"
                },
                json: jsonData
            }
        }
    request(options, (error, res, data) => {
            var resultObj = {}
            resultObj = data
            if(error){
                resolve(error)
                return;
            }
            // convert the response to an object if it didnt come as an object
            let result = typeof resultObj === 'object' ? resultObj : JSON.parse(resultObj);
            resolve(result)
        });
    })
}

/***
 * the initialization function
 * it requires the mobile number you want to initialize in a json format
 */
vereafy.init = (dataObj, callback)=>{
    vereafy._api('init', dataObj).then(result=>{
        callback(result)
    })
}

/***
 * the resend function
 * it requires pinReference and mobile number you want to resend the code to in a json format
 */
vereafy.resend = (dataObj, callback)=>{
    vereafy._api('resend', dataObj).then(result=>{
        callback(result)
    })
}

/***
 * the complete function
 * it requires the pinReference and token in a json format
 */
vereafy.complete = (dataObj, callback)=>{
    vereafy._api('complete', dataObj).then(result=>{
        callback(result)
    })
}

vereafy.getBalance = (callback)=>{
    vereafy._api('tfabalance', '', 'GET').then(result=>{
        callback(result)
    })
}
module.exports = vereafy