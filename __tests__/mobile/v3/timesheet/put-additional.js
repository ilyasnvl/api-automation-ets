const fs = require('fs');
const path = require('path');

const timesheetCollection = require('../../../../collections/mobile/v3/timesheet')
const globalVariables = require('../../../../config/global-variables.json');

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')
const timesheetHelper = require('../../../../utilities/helper/mobile/timesheet')
const tsAdditionalTestData = require('../../../../test-data/mobile/v3/timesheet/put-additional/P, successfully correction absen');
const { verifyResponse } = require('../../../../utilities/verifier');

let testData = require('require-all')({
    dirname: testDataDir
})

let res
let idTs

beforeAll(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 
    
    //     const data = JSON.parse(fs.readFileSync(globalVariables, 'utf-8'));
    //     idTs = data.__ID_TS__
    res = await timesheetCollection.putTimesheetIn(tsAdditionalTestData.header, tsAdditionalTestData.body_ts_in)
    idTs = res.body.result.id
    globalVariables.__ID_TS_ADDITIONAL__ = idTs

    res = await timesheetCollection.putTimesheetOut(tsAdditionalTestData.header, idTs, tsAdditionalTestData.body_ts_out)
})

afterAll(async () => {
    res = await timesheetHelper.delTimesheet()
    return res
})

describe("Put Additional Correction Absen", () => {
    test.each(Object.values(testData))(
        "Test $title ", async({ title, header, body, expected_result, param, expected_timesheet_detail }) => {
            res = await timesheetCollection.putAdditional(header, idTs, body)
            verifyResponse(res, expected_result)

            res = await timesheetCollection.getTimesheet(header, param)
            console.log("get timesheet:\n ", JSON.stringify(res.body, null, 2))
            verifyResponse(res, expected_timesheet_detail)
        }
    )
})