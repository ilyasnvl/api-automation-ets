const restApiCaller = require('../../../../callers/rest-api')

async function postContract(header, body) {
    console.log("request header: ", header)

    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/fok/receiver/v3/contract',
        header: header,
        body: body
    })

    const res = await caller.post()
    return res
}

async function putFokSales(header, body) {
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/fok/receiver/v3/contract/fok-sales',
        header: header,
        body: body
    })

    const res = await caller.put()
    return res
}

async function putFokOperator(header, body) {
    const caller = new restApiCaller({
        url: __BASE_URL__,
        endPoint: '/fok/receiver/v3/contract/fok-operator',
        header: header,
        body: body
    })

    const res = await caller.put()
    return res
}

module.exports = {
    postContract,
    putFokSales,
    putFokOperator
}