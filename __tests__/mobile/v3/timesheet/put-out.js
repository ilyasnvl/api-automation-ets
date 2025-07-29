const timesheetCollection = require('../../../../collections/mobile/v3/timesheet')

const fs = require('fs');
const path = require('path');
const { verifyResponse } = require('../../../../utilities/verifier');
const { header, body_ts_in } = require('../../../../test-data/mobile/v3/timesheet/put-out/P, successfully timesheet out');
const globalVariables = require('../../../../config/global-variables.json');
const timesheetHelper = require('../../../../utilities/helper/mobile/timesheet')

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})


let res
let idTs

beforeAll(async () => {    
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay

    // const data = JSON.parse(fs.readFileSync(globalVariables, 'utf-8'));
    // idTs = data.__ID_TS__

    res = await timesheetCollection.putTimesheetIn(header, body_ts_in)
    idTs = res.body.result.id
    globalVariables.__ID_TS_OUT__ = idTs

console.log("id dari tc put out: ", idTs)
})

afterAll(async () => {
    res = await timesheetHelper.delTimesheet()
    return res
})

describe("Put Timesheet Out Driver", () => {

    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result, param, expected_timesheet_detail }) => {
            res = await timesheetCollection.putTimesheetOut(header, idTs, body)
            verifyResponse(res, expected_result)

            console.log("response id dari test suite", idTs)

            res =  await timesheetCollection.getTimesheet(header, param)
            console.log("get timesheet:\n ", JSON.stringify(res.body, null, 2))
            verifyResponse(res, expected_timesheet_detail)
        }
    )
})