const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_FOK__}`,
        "X-Request-Id": "mobile",
    },
    "param": {},
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "is_able_to_login": true,
                "is_able_to_access": true
            }
        }
    }
}

module.exports = test_data