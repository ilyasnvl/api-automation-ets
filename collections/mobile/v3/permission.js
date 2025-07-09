const restApiCaller = require('../../../callers/rest-api')

async function postPermission(header, body) {
    console.log("req body permission: ", body)

    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/mobile/v3/permission',
        header: header,
        body: body,
    })

    const res = await caller.post()
    console.log("response permission: ", res.body)
    return res
}

module.exports = {
    postPermission
}