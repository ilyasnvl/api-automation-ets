const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];
const { generateDateTime } = require('../../../../../utilities/tools')

let period = generateDateTime(0, 7).slice(0, 7)

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_FOK__}`,
        "X-Request-Id": "mobile"
    },
    "param": {
        "period": period
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "id": expect.any(Number),
                "ts_number_driver": expect.any(String),
                "contract_number": "1205008405",
                "item_number": "8405",
                "period": period,
                "period_start_date": expect.any(String),
                "period_end_date": expect.any(String),
                "customer_number": "0000590181",
                "driver_nip": expect.any(String),
                "driver_name": "ARIANTO",
                "pool_code": "BC",
                "detail_number": "1",
                "equipment_number": "1081982",
                "year": expect.any(String),
                "vehicle_class_code": "LUX",
                "vehicle_class_type": "TOYOTA VOXY",
                "area_code": "JKT",
                "commission": 5,
                "working_hours": 10,
                "driver_type": 11
            }
        }
    }
}

module.exports = test_data