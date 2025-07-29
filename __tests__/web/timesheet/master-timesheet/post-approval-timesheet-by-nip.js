const masterTsCollection = require('../../../../collections/web/timesheet/master-timesheet')
const { verifyResponse } = require('../../../../utilities/verifier');
const { putTimesheetIn, putTimesheetOut } = require('../../../../collections/mobile/v3/timesheet');
const tsInTestData = require('../../../../test-data/mobile/v3/timesheet/put-in/P, successfully timesheet in');
const tsOutTestData = require('../../../../test-data/mobile/v3/timesheet/put-out/P, successfully timesheet out');

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res
let idTs

beforeAll(async () => {
    res = await putTimesheetIn(tsInTestData.header, tsInTestData.body)
    idTs = res.body.result.id

    res = await putTimesheetOut(tsOutTestData.header, idTs, tsOutTestData.body)
    console.log("absen out ok: ", res.body)

})

describe("Post Approval Timesheet By NIP", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result, param_master_ts, expected_master_ts}) => {
            res = await masterTsCollection.postApprovalTsByNip(header, body)
            verifyResponse(res, expected_result)

            res = await masterTsCollection.getMasterTimesheet(header, param_master_ts)
            verifyResponse(res, expected_master_ts)
        }
    )
})