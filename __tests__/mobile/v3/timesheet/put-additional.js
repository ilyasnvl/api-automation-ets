const fs = require('fs');
const path = require('path');

const timsheetCollection = require('../../../../collections/mobile/v3/timesheet')
const globalVariables = path.resolve(__dirname, '../../../../config/global-variables.json');

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')
const timesheetHelper = require('../../../../utilities/helper/mobile/timesheet')
const tsInTestData = require('../../../../test-data/mobile/v3/timesheet/put-in/P, successfully timesheet in')
const tsOutTestData = require('../../../../test-data/mobile/v3/timesheet/put-out/P, successfully timesheet out')

let testData = require('require-all')({
    dirname: testDataDir
})

let res
let idTs

beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 
    
        const data = JSON.parse(fs.readFileSync(globalVariables, 'utf-8'));
        idTs = data.__ID_TS__
    // const header = {
    //     "Authorization": `Bearer ${__TOKEN_DA_PERMISSION__}`,
    //     "X-Request-Id": "mobile"
    // },
    // res = await timsheetCollection.putTimesheetIn(header, tsInTestData.body)
    // //console.log("response timesheet IN di test suite additional: ", res.body.result.id)
    // idTs = res.body.result.id
    // console.log("response idTs in additional: ", idTs)

    // resTsOut = await timsheetCollection.putTimesheetOut(header, idTs, tsOutTestData.body)
    // console.log("respnose absen out from test suite additional: ", resTsOut.body)
})

// afterAll(async () => {
//     res = await timesheetHelper.delTimesheet()
//     return res
// })

describe("Put Correction Absen", () => {
    test.each(Object.values(testData))(
        "Test $title ", async({ title, header, body, expected_result }) => {
            res = await timsheetCollection.putAdditional(header, idTs, body)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)

            // globalVariables.__ID_TS_ADDITIONAL__ = idTs
            // console.log("Response id from test suite additional: ", globalVariables.__ID_TS_ADDITIONAL__)
        }
    )
})