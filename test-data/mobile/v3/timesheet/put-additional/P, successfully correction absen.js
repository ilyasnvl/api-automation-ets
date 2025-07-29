const path = require('path');
const scriptName = path.basename(__filename).split('0')[0];

const { generateDateTime } = require('../../../../../utilities/tools')
const schema = require('../../../../../schema/mobile/v3/timesheet/get-timesheet.json')

let UpdateStartOfWork = generateDateTime(9 - new Date().getHours(), 7) //set date today and time 09.xx.xx
let UpdateEndOfWork = generateDateTime(23 - new Date().getHours(), 7) //set date today and time 23.xx.xx
let startOfWork = generateDateTime(0, 7)
let endOfWork = generateDateTime(0, 7)
let dateOfService = startOfWork.slice(0, 10)

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_PUT_ADDITIONAL__}`,
        "X-Request-Id": "mobile"
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
        "add_info_type": 5,
        "start_of_work": UpdateStartOfWork,
        "end_of_work": UpdateEndOfWork,
        "out_town_location": "Cilegon, Banten, Indonesia|cilegon",
        "out_town_longitude": 106.0537688,
        "out_town_latitude": -6.017389,
        "notes": "[Automation] Lupa Absen Luar Kota, inap, lembur"
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
                    "is_overnight": true,
                    "is_out_of_town": true,
                    "add_info_type": 5,
                    "add_info_status": 1,
                    "add_info_notes":"[Automation] Lupa Absen Luar Kota, inap, lembur"
                }]
            }
        },
        "json_schema": schema
    }
}

module.exports = test_data