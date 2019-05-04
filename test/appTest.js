var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
const assert = require("chai").assert;
const vereafy = require("../vereafy");

const sandboxApiKey = "CCL.7F9S1OWgCO4O-QB.5z5CuTFgNzjldhI8TQO2IQRF";

describe("Vereafy", function () {
    it("Verify that API Key is defined", function () {
        assert.isEmpty(vereafy.apiKey, "API Key exists");
    });

    it("Vereafy returns error object when an error occurs", function () {
        vereafy.init({}, (data) => {
            assert.hasAllKeys(data, ["error", "code"]);
        });
    });

    it("Verify that API Key is not set by default", function () {
        assert.lengthOf(vereafy.apiKey, 0);
    });

    it("Vereafy returns error code 401 when apiKey is not set", function () {
        vereafy.init({}, (data) => {
            assert.equal(data.code, 401);
        });
    });

    it("Returns Request Error", function () {
        vereafy._api("tfabalance", "", "GET", 1)
            .then((resp) => {
                assert.instanceOf(resp, Error);
            });
    });

    // Test with Sandbox API Key
    it("API Key is 44 characters long", function () {
        assert.lengthOf(sandboxApiKey, 44);
    });

    it("Balance property is returned when correct API Key is provided", function () {
        vereafy.apiKey = sandboxApiKey;
        vereafy.getBalance((data) => {
            assert.hasAllKeys(data, ["balance"]);
        });
    });

    it("Missing fields during vereafy initialization returns error object", function () {
        vereafy.apiKey = sandboxApiKey;
        vereafy.init({}, (data) => {
            assert.hasAllKeys(data, ["error", "code"]);
        });
    });

    it("Missing fields during vereafy initialization returns error code CE1001", function () {
        vereafy.apiKey = sandboxApiKey;
        vereafy.init({}, (data) => {
            assert.equal(data.code, "CE1001");
        });
    });

    it("Empty fields during vereafy initialization returns error code CE1002", function () {
        vereafy.apiKey = sandboxApiKey;
        vereafy.init({ "mobile": "" }, (data) => {
            assert.equal(data.code, "CE1002");
        });
    });

    it("Attempt to verify non-Nigerian number returns CE1006", function () {
        vereafy.apiKey = sandboxApiKey;
        vereafy.init({ "mobile": "124062140" }, (data) => {
            assert.equal(data.code, "CE1006");
        });
    });

    it("2FA Resend endpoint", function () {
        vereafy.apiKey = sandboxApiKey;
        vereafy.resend({ "pinRef": "124062140", "mobile": "2349090000246" }, (data) => {
            assert.equal(data.code, "CE2002");
        });
    });

    it("2FA Completion endpoint", function () {
        vereafy.apiKey = sandboxApiKey;
        vereafy.complete({ "pinRef": "124062140", "token": "287363" }, (data) => {
            assert.equal(data.code, "CE2004");
        });
    });
});
