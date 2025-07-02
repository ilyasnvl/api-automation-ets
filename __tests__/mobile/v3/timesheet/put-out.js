const timsheetCollection = require('../../../../collections/mobile/v3/timesheet')

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res
let idTs

beforeEach(async () => {    
    const header = {
        "Authorization": `Bearer ${__TOKEN_DA_TS__}`,
        "X-Request-Id": "mobile"
    }

    const body =  {
        "start_of_work": "2025-07-01T09:00:00+07:00",
        "ts_start_location": "jln mampang prapatan 60",
        "ts_start_longitude": -6.2477784,
        "ts_start_latitude": 106.8208939,
        "date_of_service": "2025-07-01"
    },
    
    res = await timsheetCollection.putTimesheetIn(header, body)
    console.log("response timesheet IN di test suite: ", res.body)
    idTs = res.body.result.id
})

describe("Put Timesheet Out Driver", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result }) => {
            res = await timsheetCollection.putTimesheetOut(header, idTs, body)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)
        }
    )
})