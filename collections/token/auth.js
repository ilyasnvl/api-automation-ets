const restApiCaller = require('../../callers/rest-api')

async function postAuth(header, body) {
    const caller = new restApiCaller({
        url: __AUTH_URL__,
        endPoint: '/token/auth',
        header: header,
        body: body,
    });

    const res = await caller.post()
    return res
}

module.exports = {
    postAuth
}