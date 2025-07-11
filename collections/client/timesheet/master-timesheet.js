const restApiCaller = require('../../../callers/rest-api')

async function getMasterTimsheet(header, param) {
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: "/timesheet/v2/master-timesheet",
        header: header,
        param: param,
    })

    const res = await caller.get()
    return res
}

module.exports = {
    getMasterTimsheet
}