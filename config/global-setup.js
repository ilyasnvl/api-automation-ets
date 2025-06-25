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
        user_id: globalVariables.__VALID_NIP2__,
        user_secret: globalVariables.__VALID_PASSWORD2__
    })

    globalVariables.__RANDOM_NIP__ = generateRandomNip();
    // globalVariables.__TOKEN_OP__
    // globalVariables.__TOKEN_SALES__
    // globalVariables.__TOKEN_PIC__
    // globalVariables.__TOKEN_UDED__

    console.log("token da fok: ", globalVariables.__TOKEN_DA_FOK__);
    console.log("token da no fok: ", globalVariables.__TOKEN_DA_NO_FOK__);
}

// function generateRandomNip() {
//     const min = 10000000
//     const max = 99999999

//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function reusable for create token based on credential
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

