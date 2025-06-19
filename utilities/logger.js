const { addMsg } = require('jest-html-reporters/helper');

function generateCurlCommand(responseObject) {
    let request = JSON.parse(JSON.stringify(responseObject)).req;
    let requestMethod = request.method;
    let requestUrl = request.url;
    let requestHeaders = request.headers;
    let requestData = request.data;

    let curlCommand = `curl -i -X ${requestMethod} "${requestUrl}"\\\n`;
    for (let [key, value] of Object.entries(requestHeaders)) {
        curlCommand += ` -H "${key}: ${value}"\\\n`;
    }
    if (requestData) {
        curlCommand += ` -d \\\n'${JSON.stringify(requestData, undefined, 2)}'`;
    }
    return curlCommand;
}

async function logMessage(message) {
    await addMsg({
        message: `${message}`
    })
}

async function logRequest(responseObject) {
    await addMsg({
        message: `
____ REQUEST ____

${generateCurlCommand(responseObject)}
`
    })
}

async function logResponse(responseObject) {
    await addMsg({
        message: `
____ RESPONSE ____

STATUS CODE: ${responseObject.statusCode}
BODY:
${JSON.stringify(responseObject.body, undefined, 2)}
`
    })
}

async function logExpectation(expected_object) {
    await addMsg({
        message: `
____ EXPECTATION ____

STATUS CODE: ${expected_object.status_code}
BODY:
${JSON.stringify(expected_object.body, undefined, 2)}
`
    })
}


module.exports = {
    logMessage, logRequest, logResponse, logExpectation
}
