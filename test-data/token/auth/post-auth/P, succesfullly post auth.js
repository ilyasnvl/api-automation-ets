const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];

const test_data = {
    "title": scriptName,
    "header": {
        "Content-Type": "application/json",
    },
    "body": {
        "user_id": __VALID_NIP__,
        "user_secret": __VALID_PASSWORD__,
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
            "id_token": expect.any(String),
            "expires_in": expect.any(String),
            "refresh_token": "",
            "error": "",
            "error_description": "",
            "error_uri": ""
        }
    }
}

module.exports = test_data