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
        "Authorization": `Bearer ${__TOKEN_UDED__}`
    },
    "header_absen": {
        "Authorization": `Bearer ${__TOKEN_DA_PUT_OUT__}`,
        "X-request-id": "mobile",
    },
    "body_ts_in": {
        "start_of_work": startOfWork,
        "ts_start_location": "jln mampang prapatan 60",
        "ts_start_longitude": -6.2477784,
        "ts_start_latitude": 106.8208939,
        "date_of_service": dateOfService
    },
    "body_ts_out": {
        "end_of_work": endOfWork,
        "ts_end_location": "Blok M Kebayoran baru",
        "ts_end_longitude": 106.79877,
        "ts_end_latitude": -6.2411265,
        "route": "blok m aja",
        "is_overtime" : true,
        "km_finish": 3500
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
                    "status": 21,
                    "approval_dedicated_uid_by": 11109
                }]
            }
        },
        "json_schema": schema
    }
}

module.exports = test_data