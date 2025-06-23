const restApiCaller = require('../../../callers/rest-api');
const { body } = require('../../../test-data/token/auth/post-auth/P, succesfullly post auth')
const { postAuth } = require('../../token/auth');

async function getLogin(header, param) {
    const caller = new restApiCaller({
        url: __MOBILE_URL__,
        endPoint: '/mobile/v3/login',
        header: header,
        param: param,
    });

    const res = await caller.get()
    return res
}

module.exports = {
    getLogin
}