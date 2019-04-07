# Vereafy Nodejs Library

  [Introduction](#intro)
  [How to use the library](#how-to-use)
  [How to generate an API Key](#generating-api-key)
  [Initialization](#initialization)
  [Resend](#resending)
  [Completion](#completion)
  [Get Balance](#balance)
  [Error Responses](#error-responses)

## Introduction {#intro}

Vereafy is an SMS based 2-factor authentication services that uses machine learning to understand the causes of OTP delivery failures and resolves them instantly to ensure your login and sign up OTPs deliver.

This Vereafy Nodejs Library Project was created to enable nodejs developers integrate seamlessly with the Vereafy API.

## How to use this library {#how-to-use}
 * first download the file into your project directory
 * Install request
 * Replace the vereafy.apiKey with your api key inside the string
 * Require this file in your project file
 * Call any of the function you want to use in your file and put in the parameters and a callback function
 * The parameters are passed as dataObj and are inputed in a JSON format /({"mobile":"23470xxxxxx"})/
 
## How to generate an API Key {#generating-api-key}
Your API Key is first generated when you register an app. To register an app,
Login to the Developers Dashboard, Navigate to Apps > Add, Type the name of your app and click *Submit*. The app will be registered and a new API Key will be generated. Copy the API key into your project
 
## Initialization {#initialization}
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
            "pinRef": "1293488527"
        }
```
## Resending {#resending}
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
             "pinRef": "1293488527"
        }
```
## Completion {#completion}
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
##  Get Balance {#balance}
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
            "balance":800
        }
```

## Error Responses {#error-responses}
In a case where the request fails due to one reason or another you should get an error response from the requested endpoint that looks like this:
```sh
        {
            "error":"Invalid PIN Ref",
            "code":"CE2000"
        }
```
The table below shows a list of error codes and their descriptions

| Error Code | Description     |
|:---------:| :--------------|
| CE1001	| Missing Fields |
| CE1002	| Empty Fields |
| CE1006	| Not a Nigerian Number |
| CE2000	| Invalid PIN Ref |
| CE2002	| PIN does not reference any verification request| 
| CE2003	| Mobile number does not match original request |
| CE2001	| Invalid PIN |
| CE2004	| Request Not Found |
| CE7000	| Verification already succeeded |
| CE7001	| Verification already failed |
| CE6000	| Insufficient Balance |
| CE5000	| Invalid Template ID |
| CE5001	| Could not find referenced template |
