const restApiCaller = require('../../../callers/rest-api');
const { body } = require('../../../test-data/token/auth/post-auth/P, succesfullly post auth');
const { postAuth } = require('../../token/auth');

// beforeAll(async () => {
//     const header = {
//         "Content-Type": "application/json"
//     }
//     const res = await postAuth(header, body)

//     global.__TOKEN__ = res.body.id_token
// })

async function getProfil(header, param) {
    // const headers = {
    //     "Authorization": `Bearer ${global.__TOKEN__}`,
    //     "X-Request-Id": "mobile"
    // }

    const caller = new restApiCaller({
        url: __MOBILE_URL__,
        endPoint: "/mobile/v3/profile",
        header: header,
        param: param,
    })

    const res = await caller.get()
    console.log("[DEBUG] Respons:", res.status, res.body);
    return res
}

module.exports = {
    getProfil
}