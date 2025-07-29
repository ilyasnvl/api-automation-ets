const path = require('path')

const scriptName = path.basename(__filename).split('.')[0]
const schema = require('../../../../../schema/client/driver/permission/get-permission.json')

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_OP__}`,
        "X-Request-Id": "web-v2"
    },
    "param": {
        "show": 10
    },
    "expected_result": {
        "status_code": 200,
        "body": {},
        "json_schema": schema
    }
}

module.exports = test_data