const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];

const test_data = {
    "title": scriptName,
    "header": {
        "Content-Type": "application/json",
    },
    "body": {
        "user_id": __VALID_NIP__,
        "user_secret": "8181",
        "scope": "openid email profile phone offline_access",
        "response_type": "id_token token code"
    },
    "expected_result": {
        "status_code": 500,
        "body": {
            "error": "runtime error: invalid memory address or nil pointer dereference",
            "code": 13,
            "message": "runtime error: invalid memory address or nil pointer dereference",
            "details": []
        }
    }
}

module.exports = test_data