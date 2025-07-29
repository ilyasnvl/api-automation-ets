const path = require('path')
const { generateDateTime } = require('../../../../../utilities/tools')
const scriptName = path.basename(__filename).split('.')[0]
const schema = require('../../../../../schema/client/timesheet/master-timesheet/get-master-timesheet.json')

let period = generateDateTime(0, 7).slice(0, 7)

const test_data = {
    "title": scriptName,
    "header": {
        "X-request-id": "web-v2",
        "Authorization": `Bearer ${__TOKEN_OP__},`
    },
    "body": {
        "data": [
            {
                "nip": __VALID_NIP__
            }
        ],
        "period": period
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "message": "Processed successfully"
            }
        },
        "json_schema": {}
    },
    "param_master_ts": {
        "driver_nip": __VALID_NIP__,
        "period": period,
    },
    "expected_master_ts": {
        "status_code": 200,
        "body": {
            "result": {
                "data": [{
                    "status": 25,
                    "approval_operator_by": 76
                }]
            }
        },
        "json_schema": schema
    }
}

module.exports = test_data