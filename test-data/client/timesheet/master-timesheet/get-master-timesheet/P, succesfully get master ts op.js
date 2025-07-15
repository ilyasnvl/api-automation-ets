const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];
const schema = require('../../../../../schema/client/timesheet/master-timesheet/get-master-timesheet.json');
const { generateDateTime } = require('../../../../../utilities/tools');

let period = generateDateTime(0, 7).slice(0, 7)

const test_data = {
    "title": scriptName,
    "header": {
        "X-request-id": "web-v2",
        "Authorization": `Bearer ${__TOKEN_OP__},`
    },
    "param": {
        "period": period,
        "show": 10,
    },
    "expected_result": {
        "status_code": 200,
        "body": {},
        "json_schema": schema
    }
}

module.exports = test_data