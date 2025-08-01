const path = require('path')
const { generateDateTime } = require('../../../../../utilities/tools')

const scriptName = path.basename(__filename).split('.')[0]
const permissionDate = generateDateTime(0, 7).slice(0, 10)

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_PERMISSION__}`,
        "X-Request-Id": "mobile"
    },
    "body": {
        "driver_nip": __NIP_PERMISSION__,
        "permission_type_id": 21,
        "permission_date_start": permissionDate,
        "permission_date_end": permissionDate,
        "request_note": "test",
        "driver_notes": {
            "parking_location": "test",
            "car_key_and_stnk": "test",
            "user_pic_name": "test",
            "user_pic_phone_number": "08888888",
            "entry_time": "09:00",
            "purpose": "test"
        }
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "id": [
                    expect.any(Number)
                ]
            }
        }
    }
}

module.exports = test_data