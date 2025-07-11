const timsheetCollection = require('../../../../collections/mobile/v3/timesheet')
const globalVariables = require('../../../../config/global-variables.json')

const timesheetHelper = require('../../../../utilities/helper/mobile/timesheet')
const tsInTestData = require('../../../../test-data/mobile/v3/timesheet/put-in/P, successfully timesheet in')

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let testData = require('require-all')({
    dirname: testDataDir
})

let res
let idTs

beforeAll(async () => {       
    const header = {
        "Authorization": `Bearer ${__TOKEN_DA_PUT_OUT__}`,
        "X-Request-Id": "mobile"
    }
    res = await timsheetCollection.putTimesheetIn(header, tsInTestData.body)
    console.log("response timesheet IN di test suite: ", res.body)
    idTs = res.body.result.id
})

afterAll(async () => {
    res = await timesheetHelper.delTimesheet()
    return res
})

describe("Put Timesheet Out Driver", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result }) => {
            res = await timsheetCollection.putTimesheetOut(header, idTs, body)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)

            globalVariables.__ID_TS_OUT__ = idTs
            console.log("response id dari test suite", globalVariables.__ID_TS_OUT__)
        }
    )
})