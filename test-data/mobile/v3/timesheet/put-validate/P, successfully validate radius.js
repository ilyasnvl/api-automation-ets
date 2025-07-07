const path = require('path')

const { generateDateTime } = require('../../../../../utilities/tools')

const scriptName = path.basename(__filename).split('.')[0]

let start_end_of_work = generateDateTime(0, 7)
let dateOfService = start_end_of_work.slice(0,10)

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_FOK__}`,
        "X-Request-Id": "mobile",
        "Content-Type": "application/json"
    },
    "body": {
        "start_of_work": start_end_of_work,
        "end_of_work": start_end_of_work,
        "longitude": 106.82561492919922,
        "latitude": -6.246274948120117,
        "is_check_overtime": true,
        "driver_nip": __VALID_NIP__,
        "date_of_service": dateOfService
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "id": expect.any(Number),
                "is_overtime": false,
                "overtime_hours": 0,
                "is_location_beyond_area": false,
                "distance": 15.442519399766857,
                "location_name": "Kantor Pusat Blue Bird Group, 60, Jalan Mampang Prapatan Raya, RW 06, Tegal Parang, Mampang Prapatan, Jakarta Selatan, Daerah Khusus Ibukota Jakarta, 12790, Indonesia",
                "is_out_of_town": true,
                "radius": 100,
                "last_km": 0
            }
        }
    },
}

module.exports = test_data