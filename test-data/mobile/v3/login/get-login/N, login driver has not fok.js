const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_NO_FOK__}`,
        "X-Request-Id": "mobile"
    },
    "param": {},
    "expected_result": {
        "status_code": 404,
        "body": {
            "error_code": "4003",
            "code": 404,
            "message": "The Driver is not registered into an active contract at the moment."
        }
    }
}

module.exports = test_data