const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer tokennya_salah`,
        "X-Request-Id": "mobile"
    },
    "param": {},
    "expected_result": {
        "status_code": 401,
        "body": {
            "error_code": "Unauthorized",
            "code": 401,
            "message": "error invalid token"
        }
    }
}

module.exports = test_data