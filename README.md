# Vereafy Nodejs Library

- Introduction
- How to use
- Initialization
- Resend
- Completion
- Get Balance

## Introduction:

Vereafy is an SMS based 2-factor authentication services that uses machine learning to understand the causes of OTP delivery failures and resolves them instantly to ensure your login and sign up OTPs deliver.

This Vereafy Nodejs Library Project was created to enable nodejs developers integrate seamlessly with the Vereafy API.

## How to use this library
 * first download the file into your project directory
 * Install request
 * Replace the vereafy.apiKey with your api key inside the string
 * Require this file in your project file
 * Call any of the function you want to use in your file and put in the parameters and a callback function
 * The parameters are passed as dataObj and are inputed in a JSON format /({"mobile":"23470xxxxxx"})/
 
## Initialization
The Vereafy 2fa initialization can be as simple as the following lines of code: Replace the values of sendData and vereafy.apiKey with your parameters
```sh    
        vereafy.apiKey = "api_key";
        var sendData = {"mobile":"mobile_number_to_be_verified"}
        vereafy.init(senData,(res)=>{
            //res  will return a json as seen below
        })
```
The initialization method returns a response that should look like this:
 ```sh
        {
            "status":"success",
            "pinRef": 1293488527
        }
```

## Resend
In a case where your app users get impatient and hits the retry link on your app form, just call the resend method this way: Replace the values of sendData and vereafy.apiKey with your parameters
 ```sh
        vereafy.apiKey = "api_key";
        var sendData = {"pinRef": "Your_pin_reference", "mobile":"mobile_number_to_be_verified"}
        vereafy.resend(sendData, (res)=>{
            //res  will return a json as seen below
        })
```
The resend method returns a response that should look like this:
```sh
        
        {
             "status": "success",
             "pinRef": 1293488527
        }
```
## Completion
The Vereafy 2fa completion can be as simple as the following lines of code: Replace the values of sendData and vereafy.apiKey with your parameters
```sh
        vereafy.apiKey = "api_key";
        var sendData = {"pinRef": "Your_pin_reference", "token":"verification_code"}
        vereafy.complete(sendData, (res)=>{
            //res  will return a json as seen below
        })
```

The completion method returns a response that should look like this if the parameters are correct:
```sh
       {
            "response":"success"
       }
```
##  Get Balance
To get your balance on Vereafy, the getbalance method is used this way:
This method requires no parameter: Replace the value of vereafy.apiKey with your parameters
```sh
        vereafy.apiKey = "api_key";
        vereafy.getBalance((res)=>{
            //res  will return a json as seen below
        })
```
The get balance method returns a response that should look like:
```sh
        {
            "balance":200
        }
```
