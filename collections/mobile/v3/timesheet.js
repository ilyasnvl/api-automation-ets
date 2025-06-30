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

module.exports = {
    getTimesheet
}