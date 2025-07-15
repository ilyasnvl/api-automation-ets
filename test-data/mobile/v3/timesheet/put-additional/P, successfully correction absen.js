const path = require('path');
const scriptName = path.basename(__filename).split('0')[0];

const { generateDateTime } = require('../../../../../utilities/tools')

let startOfWork = generateDateTime(9 - new Date().getHours(), 7) //set date today and time 09.xx.xx
let endOfWork = generateDateTime(23 - new Date().getHours(), 7) //set date today and time 23.xx.xx

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Bearer ${__TOKEN_DA_FOK__}`,
        "X-Request-Id": "mobile"
    },
    "body": {
        "add_info_type": 5,
        "start_of_work": startOfWork,
        "end_of_work": endOfWork,
        "out_town_location": "Cilegon, Banten, Indonesia|cilegon",
        "out_town_longitude": 106.0537688,
        "out_town_latitude": -6.017389,
        "notes": "[Automation] Lupa Absen Luar Kota, inap, lembur"
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "message": "Processed successfully"
            }
        },
    }
}

module.exports = test_data