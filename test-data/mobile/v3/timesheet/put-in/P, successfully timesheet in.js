const path = require('path')

const scriptName = path.basename(__filename).split('.')[0]

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_FOK__}`,
        "X-Request-Id": "mobile"
    },
    "body": {
        "start_of_work": "2025-07-01T09:00:00+07:00",
        "ts_start_location": "jln mampang prapatan 60",
        "ts_start_longitude": -6.2477784,
        "ts_start_latitude": 106.8208939,
        "date_of_service": "2025-07-01"
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "message": "Processed successfully",
                "id": expect.any(Number)
            }
        }
    }
}

module.exports = test_data