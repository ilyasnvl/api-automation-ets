const path = require('path')
const { generateDateTime } = require('../../../../../utilities/tools')

const scriptName = path.basename(__filename).split('.')[0]

let permissionDate = generateDateTime(0, 7).slice(0, 10)

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_OP__}`,
        "X-Request-Id": "web-v2"
    },
    "body": {
        "driver_nip": "00078248",
        "driver_type_id": 11,
        "permission_date_start": permissionDate,
        "permission_date_end": permissionDate,
        "permission_type_id": 1,
        "request_note": "teasd"
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
        },
        "json_schema": {}
    }
}

module.exports = test_data