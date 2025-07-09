const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];

const test_data = {
    "title": scriptName,
    "header": {
        "Content-Type": "application/json",
    },
    "body": {
        "user_id": "88888886",
        "user_secret": "8886",
        "scope": "openid email profile phone offline_access",
        "response_type": "id_token token code"
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": "",
            "state": "",
            "scope": "",
            "access_token": "",
            "token_type": "",
            "id_token": "",
            "expires_in": "0",
            "refresh_token": "",
            "error": "invalid_user_or_pass",
            "error_description": "Invalid username or password",
            "error_uri": ""
        }
    }
}

module.exports = test_data