const globalVariables = require('./global-variables.json')
const request = require('supertest');

const baseURL = globalVariables.__AUTH_URL__;

module.exports = async function (globalConfig, projectConfig) {
    console.log(globalConfig.testPathPattern);
    console.log(projectConfig.cache);
    console.log("Running global setup...");

    globalVariables.__TOKEN_DA__ = await createTokenDa();
    // globalVariables.__TOKEN_OP__
    // globalVariables.__TOKEN_SALES__
    // globalVariables.__TOKEN_PIC__
    // globalVariables.__TOKEN_UDED__

    console.log("token da: ", globalVariables.__TOKEN_DA__);
}

async function createTokenDa() {
    const body = {
        "user_id": globalVariables.__VALID_NIP__,
        "user_secret": globalVariables.__VALID_PASSWORD__,
        "scope": "openid email profile phone offline_access",
        "response_type": "id_token token code"
    };

    try {
        const response = await request(baseURL)
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

