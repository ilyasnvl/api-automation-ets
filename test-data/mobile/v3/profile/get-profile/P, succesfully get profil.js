const path = require('path');
const scriptName = path.basename(__filename).split('.')[0];

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA__}`,
        "X-Request-Id": "mobile"
    },
    "param": {
        "period": "2025-06"
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "id": expect.any(Number),
                "ts_number_driver": "8880002860",
                "contract_number": "1205008405",
                "item_number": "8406",
                "period": "2025-06",
                "period_start_date": "2025-06-01",
                "period_end_date": "2025-06-30",
                "customer_number": "0000590181",
                "driver_nip": expect.any(String),
                "driver_name": "ARIANTO",
                "pool_code": "BC",
                "detail_number": "1",
                "equipment_number": "1081982",
                "year": "2025",
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