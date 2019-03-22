const request = require('request')

function initialize (pinreference, mobile, apiKey){
    return new Promise(resolve=>{
    // send message api;
        let options = {
            url: 'https://api.cecula.com/twofactor/resend', // cecula resending the code
            method: 'POST',
            headers:{
                "Content-Type": "application/json", //our application receives only json
                "Accept": "application/json",
                "Authorization": "Bearer "+apiKey, // apikey is your application key
            },
            json: {
                "pinRef": pinreference, //pin reference given during initialization
                "mobile": mobile //the number you want to register
            }
        }
        request(options, (error, res, data) => {
            if(error){
                resolve(error)
                return;
            }
            if(data){
                // convert the response to an object if it didnt come as an object
                let result = typeof data === 'object' ? data : JSON.parse(data);
                resolve(result)
            }
        });
    })
}
//invoking the function with the parameters(pinreference, phone and apikey)
initialize('6542345645', '2347061967265', 'CCL.7fEAQVxBm2BJ-z8.7IODT8geppFjDRV6f2lTDcPa').then(result=>{
    if(result.status === 'success'){
        //do what ever you want to do here
    }else{
        console.log(result)
    }
})