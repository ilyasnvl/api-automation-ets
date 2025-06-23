const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA__}`,
    },
    "param": {  },
    "expected_result": {
        "status_code": 400,
        "body": {
            "error_code": "Unauthorized",
            "code": 400,
            "message": "Invalid X-Request-Id"
        }
    }
}

module.exports = test_data