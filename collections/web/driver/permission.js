const restApiCaller = require('../../../callers/rest-api')

async function postPermissionWeb(header, body) {
    console.log("req body permission, ", body)

    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/driver/v1/permission',
        header: header,
        body: body
    })

    const res = await caller.post()
    return res
}

async function putApprovePermission(header, idPermission, body) {
    console.log("Req body approve permission: ", body)

    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/driver/v1/permission/approve/' + idPermission,
        header: header,
        body: body
    })

    const res = await caller.put()
    console.log("Response approve permission: ", res.body)
    return res
}

async function getPermission(header, param) {
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/driver/v1/permission',
        header: header,
        param: param
    })

    const res = await caller.get()
    console.log("Response get permission: ", res.body)
    return res
}

module.exports = {
    postPermissionWeb,
    putApprovePermission,
    getPermission
}