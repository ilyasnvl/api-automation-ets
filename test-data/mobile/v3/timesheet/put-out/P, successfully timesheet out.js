const path = require('path');
const scriptName = path.basename(__filename).split('0')[0];
const schema = require('../../../../../schema/mobile/v3/timesheet/get-timesheet.json')

const { generateDateTime } = require('../../../../../utilities/tools')

let startOfWork = generateDateTime(0, 7)
let endOfWork = generateDateTime(0, 7)
let dateOfService = startOfWork.slice(0, 10)

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_PUT_OUT__}`,
        "X-Request-Id": "mobile"
    },
    "body_ts_in": {
        "start_of_work": startOfWork,
        "ts_start_location": "jln mampang prapatan 60",
        "ts_start_longitude": -6.2477784,
        "ts_start_latitude": 106.8208939,
        "date_of_service": dateOfService
    },
    "body": {
        "end_of_work": endOfWork,
        "ts_end_location": "Blok M Kebayoran baru",
        "ts_end_longitude": 106.79877,
        "ts_end_latitude": -6.2411265,
        "route": "blok m aja",
        "is_overtime" : true,
        "km_finish": 3500
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
    "expected_timesheet_detail": {
        "status_code": 200,
        "body": {
            "result": {
                "data": [{
                    "status": 12
                }]
            }
        },
        "json_schema": schema
    }
}

module.exports = test_data