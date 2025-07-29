const path = require('path')
const schema = require('../../../../../schema/client/driver/permission/get-permission.json')
const schemaMasterTs = require('../../../../../schema/client/timesheet/master-timesheet/get-master-timesheet.json')
const { generateDateTime } = require('../../../../../utilities/tools')
const scriptName = path.basename(__filename).split('.')[0]

let period = generateDateTime(0, 7).slice(0, 7)

const test_data = {
    "title": scriptName,
    "param_master_ts": {
        "driver_nip": __NIP_PERMISSION__,
        "period": period,
        "show": 1
    },
    "header": {
        "Authorization": `Bearer ${__TOKEN_OP__}`,
        "X-Request-Id": "web-v2"
    },
    "body": {
        "replacement_driver_nip": __NIP_PPK__,
        "replacement_driver_name": __NAME_PPK__,
        "replacement_driver_phone": __PHONE_NUMBER_PPK__,
        "plate_number": "B 1328 FFI,"
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "message": "Processed successfully"
            }
        },
        "json_schema": {}
    },
    "param_get_permission": {
        "driver_nip": __NIP_PERMISSION__,
        "show": 1
    },
    "expected_get_permission":{
        "status_code": 200,
        "body": {
            "result": {
                "data": [{
                    "status": 2
                }]
            }
        },
        "json_schema": schema,
    },
    "expected_master_ts":{
        "status_code": 200,
        "body": {
            "result": {
                "data": [
                    {
                    "status": 72
                },
            ]
            }
        },
        "json_schema": schemaMasterTs,
    },
}

module.exports = test_data