const path = require('path')
const { generateDateTime } = require('../../../../../utilities/tools')
const globalVariables = require('../../../../../config/global-variables.json')
const schema = require('../../../../../schema/client/timesheet/master-timesheet/get-master-timesheet.json')

const scriptName = path.basename(__filename).split('.')[0]

let period = generateDateTime(0, 7).slice(0, 7)
let startOfWork = generateDateTime(0, 7)
let endOfWork = generateDateTime(0, 7)
let dateOfService = startOfWork.slice(0, 10)

const test_data = {
    "title": scriptName,
    "header": {
        "X-request-id": "web-v2",
        "Authorization": `Bearer ${__TOKEN_PIC__}`
    },
    "body": {
        "ids": []
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
        "driver_nip": __NIP_PUT_OUT__,
        "period": period,
    },
    "expected_master_ts": {
        "status_code": 200,
        "body": {
            "result": {
                "data": [{
                    "status": 23,
                    "approval_pic_by": 11108
                }]
            }
        },
        "json_schema": schema
    }
}

module.exports = test_data