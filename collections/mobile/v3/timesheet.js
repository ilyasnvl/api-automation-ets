const restApiCaller = require('../../../callers/rest-api')

async function getTimesheet(header, param) {
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/mobile/v3/timesheet',
        header: header,
        param: param,
    })

    const res = await caller.get()
    console.log("response body ts: ", res.body)
    return res
}

async function putValidate(header, body) {
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/mobile/v3/timesheet/validate',
        header: header,
        body: body,
    })   
    
    const res = await caller.put()
    console.log("response validate: ", res.body)
    return res
}

async function putTimesheetIn(header, body) {
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/mobile/v3/timesheet/in',
        header: header,
        body: body,
    })

    const res = await caller.put()
    console.log("response absen in: ", res.statusCode, res.body.result.id)
    return res
}

async function putTimesheetOut(header, idTs,body) {
    console.log("id dari ts in: ", body)
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/mobile/v1/timesheet/out/' + idTs,
        header: header,
        body: body,
    })

    const res = await caller.put()
    console.log("response ts out: ", res.body)
    return res
}

module.exports = {
    getTimesheet,
    putValidate,
    putTimesheetIn,
    putTimesheetOut
}