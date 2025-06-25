const restApiCaller = require('../../../callers/rest-api');

async function getProfil(header, param) {
    const caller = new restApiCaller({
        url: __BASE_URL__,
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