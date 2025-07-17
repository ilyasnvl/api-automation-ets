const path = require('path')
const { generateDateTime } = require('../../../../../utilities/tools')
const scriptName = path.basename(__filename).split('.')[0]

let period = generateDateTime(0, 7).slice(0, 7)

const test_data = {
    "title": scriptName,
    "header": {
        "X-request-id": "web-v2",
        "Authorization": `Bearer ${__TOKEN_PIC__},`
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
        }
    }
}

module.exports = test_data