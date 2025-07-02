const path = require('path');
const scriptName = path.basename(__filename).split('0')[0];

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_TS__}`,
        "X-Request-Id": "mobile"
    },
    "body": {
        "end_of_work": "2025-07-01T18:00:00+07:00",
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
    }
}

module.exports = test_data