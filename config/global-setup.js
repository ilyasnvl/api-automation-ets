// const { getTimesheet, putTimesheetIn } = require('../collections/mobile/v3/timesheet');
// const test_data = require('../test-data/mobile/v3/timesheet/put-in/P, successfully timesheet in');
const globalVariables = require('./global-variables.json')
const request = require('supertest');

const authUrl = globalVariables.__AUTH_URL__;
const baseUrl = globalVariables.__BASE_URL__;

module.exports = async function (globalConfig, projectConfig) {
    console.log(globalConfig.testPathPattern);
    console.log(projectConfig.cache);
    console.log("Running global setup...");

    // create token driver have FOK
    globalVariables.__TOKEN_DA_FOK__ = await createTokenDa({
        user_id: globalVariables.__VALID_NIP__,
        user_secret: globalVariables.__VALID_PASSWORD__
    });

    // create token driver that haven't FOK
    globalVariables.__TOKEN_DA_NO_FOK__ = await createTokenDa({
        user_id: globalVariables.__NIP_NO_FOK__,
        user_secret: globalVariables.__PSWD_NIP_NO_FOK__
    });

    // create token driver for timesheet in/out
    globalVariables.__TOKEN_DA_PUT_OUT__ = await createTokenDa({
        user_id: globalVariables.__NIP_PUT_OUT__,
        user_secret: globalVariables.__PSWD_NIP_PUT_OUT
    });

    // create token driver for tc put additional
    globalVariables.__TOKEN_DA_PERMISSION__ = await createTokenDa({
        user_id: globalVariables.__NIP_PUT_ADDITIONAL__,
        user_secret: globalVariables.__PWSD_NIP_PUT_ADDITIONAL__
    });

    // create token OP
    globalVariables.__TOKEN_OP__ = await createTokenCustomer({
        user_id: globalVariables.__VALID_OP__,
        user_secret: globalVariables.__VALID_PASSWORD_OP__
    });

    // create token Sales
    globalVariables.__TOKEN_SALES__ = await createTokenCustomer({
        user_id: globalVariables.__VALID_SALES__,
        user_secret: globalVariables.__VALID_PASSWORD_SALES__
    });

    // create token PIC
    globalVariables.__TOKEN_PIC__ = await createTokenCustomer({
        user_id: globalVariables.__USER_PIC__,
        user_secret: globalVariables.__PSWD_PIC__
    });

    // create token Uded
    globalVariables.__TOKEN_UDED__  = await createTokenCustomer({
        user_id: globalVariables.__USER_UDED__,
        user_secret: globalVariables.__PSWD_UDED__
    });
    
    // globalVariables.__ID_TS__  = await putTimesheetIn();
    // console.log("Resp global: ", globalVariables.__ID_TS__)

    console.log("token da fok: ", globalVariables.__TOKEN_DA_FOK__);
    console.log("token da no fok: ", globalVariables.__TOKEN_DA_NO_FOK__);
    console.log("token da for timesheet: ", globalVariables.__TOKEN_DA_PUT_OUT__)
    console.log("token da for additional: ", globalVariables.__TOKEN_DA_PERMISSION__)
    console.log("token op: ", globalVariables.__TOKEN_OP__);
    console.log("token sales: ", globalVariables.__TOKEN_SALES__);
    console.log("token pic: ", globalVariables.__TOKEN_PIC__);
    console.log("token uded: ", globalVariables.__TOKEN_UDED__);    
}

// function generateRandomNip() {
//     const min = 10000000
//     const max = 99999999

//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function reusable for create token DA based on credential
async function createTokenDa({ user_id, user_secret }) {
    const body = {
        user_id,
        user_secret,
        "scope": "openid email profile phone offline_access",
        "response_type": "id_token token code"
    };

    try {
        const response = await request(authUrl)
        .post('/token/auth')
        .send(body)

        console.log("response body: ", response.body)

        if(!response.body || !response.body.id_token) {
            throw new Error("token tidak ditemukan di response body")
        }

        return response.body.id_token;
    } catch (error) {
        console.error("gagal mendapatkan token: ", error.message);
        return null
    }
}

// function reusable for create token customer based on credential
async function createTokenCustomer({ user_id, user_secret }) {
    const body = {
        user_id,
        user_secret,
    };

    try {
        const response = await request(baseUrl)
        .post('/customer/v2/token/auth')
        .send(body)

        console.log("response body: ", response.body)

        if(!response.body || !response.body.result.access_token) {
            throw new Error("token customer tidak ditemukan di response body")
        }

        return response.body.result.access_token;
    } catch (error) {
        console.error("gagal mendapatkan token customer: ", error.message);
        return null
    }
}

