# Vereafy
A Node JS package for Cecula Vereafy.

[![NPM](https://nodei.co/npm/vereafy.png)](https://nodei.co/npm/vereafy/)

[![Build Status](https://travis-ci.org/cecula-vereafy/nodejs-library.svg?branch=master)](https://travis-ci.org/cecula-vereafy/nodejs-library)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/72e1aefb08e74dd48733b45045e6e7e3)](https://www.codacy.com/app/godwin-noah/nodejs-library?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cecula-vereafy/nodejs-library&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/cecula-vereafy/nodejs-library/branch/master/graph/badge.svg)](https://codecov.io/gh/cecula-vereafy/nodejs-library)
[![Known Vulnerabilities](https://snyk.io/test/github/cecula-vereafy/nodejs-library/badge.svg)](https://snyk.io/test/github/cecula-vereafy/nodejs-library) 

## Table of Content
1.  [Introduction](#introduction)
2.  [How to use the library](#how-to-use-this-library)
3.  [Installation](#installation)
4.  [How to generate an API Key](#how-to-generate-an-api-key)
5.  [Importing Vereafy Library](#importing-vereafy-library)
6.  [Initializating 2FA](#initializing-2fa)
7.  [Resending OTP](#resending-otp)
8.  [Completing 2FA](#completing-2fa)
9.  [Getting Balance](#getting-balance)
10. [Error Responses](#error-responses)

## Introduction

Vereafy is an SMS based 2-factor authentication service that uses machine learning to understand the causes of OTP delivery failures and resolves them instantly to ensure your login and sign up OTPs deliver.

The Vereafy Nodejs Library Project was created to enable nodejs developers integrate seamlessly with the Vereafy API.

## How to use this library
*   Install vereafy from npm or yarn following the instructions in the Installation section or clone from GitHub
*   Login to the <a href="https://developer.cecula.com" target="_blank">Cecula Developers Platform</a> register your app and generate an API KEY
*   Import/Require the library into your script

## Installation
Install with NPM:
```sh
npm i vereafy
```
Install with Yarn:
```sh
yarn add vereafy
```
Clone from GitHub
```sh
git clone https://github.com/cecula-vereafy/nodejs-library.git
```
 
## How to generate an API Key

Your API Key is first generated when you register an app. To register an app,
<a href="https://developer.cecula.com" target="_blank">Login to the Developers Dashboard</a>, __Navigate to Apps > Add__, Type the name of your app and click *Submit*. The app will be registered and a new API Key will be generated. Copy the API key into your project

## Importing Vereafy Library
If you installed the library using npm or yarn, import the library into your script using the code below
```sh
const vereafy = require("vereafy");
vereafy.apiKey = "<API_KEY>"
```
Otherwise, if you cloned the library from GitHub, import the library into your script using the code below
```sh
const vereafy = require("./path/to/vereafy");
vereafy.apiKey = "<API_KEY>"
```

## Initializing 2FA
The Vereafy 2fa initialization can be as simple as the following lines of code:
```sh
    var sendData = {
        "mobile": "23480xxxxxxxx"
    };

    vereafy.init(senData,(res)=>{
        // If status is success show user form to type OTP
    });
```
The initialization method returns a response that should look like this:
 ```sh
    {
        "status": "success",
        "pinRef": "1293488527"
    }
```

## Resending OTP
In a case where your app users get impatient and hits the retry link on your app form, just call the resend method this way:
 ```sh
    var sendData = {
        "pinRef": "1293488527",
        "mobile": "23480xxxxxxxx"
    };

    vereafy.resend(sendData, (res)=>{
        // If status is success, show user form to type OTP
    });
```

The resend method returns a response that should look like this:

```sh
    {
        "status": "success",
        "pinRef": "1293488527"
    }
```

## Completing 2FA
The Vereafy 2fa completion can be as simple as the following lines of code:
```sh
    var sendData = {
        "pinRef": "1293488527",
        "token": "123456"
    }
    vereafy.complete(sendData, (res)=>{
        // Handle failure or success response
    })
```

The completion method returns a response that should look like this if the parameters are correct:

```sh
    {
        "response": "success"
    }
```

## Getting Balance
To get your balance on Vereafy, the getBalance method is used this way:
This method requires no parameter:
```sh
    vereafy.getBalance((res)=>{
        // Do Something
    })
```

The get balance method returns a response that should look like:

```sh
    {
        "balance": 800
    }
```

## Error Responses

In a case where the request fails due to one reason or another you should get an error response from the requested endpoint that looks like this:

```sh
        {
            "error": "Invalid PIN Ref",
            "code": "CE2000"
        }
```
The table below shows a list of error codes and their descriptions:

| Error Code | Description                                     |
|:----------:| :----------------------------------------------:|
| CE1001     | Missing Fields                                  |
| CE1002     | Empty Fields                                    |
| CE1006     | Not a Nigerian Number                           |
| CE2000     | Invalid PIN Ref                                 |
| CE2002     | PIN does not reference any verification request |
| CE2003     | Mobile number does not match original request   |
| CE2001     | Invalid PIN                                     |
| CE2004     | Request Not Found                               |
| CE7000     | Verification already succeeded                  |
| CE7001     | Verification already failed                     |
| CE6000     | Insufficient Balance                            |
| CE5000     | Invalid Template ID                             |
| CE5001     | Could not find referenced template              |
