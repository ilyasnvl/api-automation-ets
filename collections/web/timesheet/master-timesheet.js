const restApiCaller = require('../../../callers/rest-api')

async function getMasterTimesheet(header, param) {
    console.log("Req param get ts: ", param)
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/timesheet/v2/master-timesheet',
        header: header,
        param: param,
    })

    const res = await caller.get()
    console.log("response get master timesheet: ", res.body)
    return res
}

async function postApprovalTsByNip(header, body) {
    console.log("Req body post approval by Nip: ", body)
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/timesheet/v2/master-timesheet/approval-nip',
        header: header,
        body: body
    })

    const res = await caller.post()
    console.log("response post approval by nip: ", res.body)
    return res
}

async function postApprovalTsById(header, body) {
    console.log("Req body approve by id: ", body)

    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/timesheet/v2/master-timesheet/approval',
        header: header,
        body: body
    })

    const res = await caller.post()
    console.log("Response approve by Id: ", res.body)
    return res
}

module.exports = {
    getMasterTimesheet,
    postApprovalTsByNip,
    postApprovalTsById
}