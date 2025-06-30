const path = require('path');
const scriptName = path.basename(__filename).split('0')[0];
const schema = require('../../../../../schema/mobile/v3/timesheet/get-timesheet.json')

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_FOK__}`,
        "X-Request-Id": "mobile"
    },
    "param": {},
    "expected_result": {
        "status_code": 200,
        "body": {},
        "json_schema": schema
    }
}

module.exports = test_data