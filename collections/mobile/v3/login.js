const restApiCaller = require('../../../callers/rest-api');
const { body } = require('../../../test-data/token/auth/post-auth/P, succesfullly post auth')
const { postAuth } = require('../../token/auth');

beforeAll(async () => {
    const header = {
        "Content-Type": "application/json"
    }
    const res = await postAuth(header, body)

    global.__TOKEN__ = res.body.id_token
})

async function getLogin(header, param) {
    const headers = {
        "Authorization": `Bearer ${global.__TOKEN__}`,
        "X-Request-Id": "mobile"
    }

    const caller = new restApiCaller({
        url: __MOBILE_URL__,
        endPoint: '/mobile/v3/login',
        header: headers,
        param: param,
    });

    const res = await caller.get()
    return res
}

module.exports = {
    getLogin
}