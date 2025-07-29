const fs = require('fs');
const path = require('path');

const masterTsCollection = require('../../../../collections/web/timesheet/master-timesheet')
const timesheetCollection = require('../../../../collections/mobile/v3/timesheet')
const globalVariables = require('../../../../config/global-variables.json');
const approvalTsTestData = require('../../../../test-data/web/timesheet/master-timesheet/post-approval-timesheet-by-id/P, A, successfully approval ts by id - uded');
const timesheetHelper = require('../../../../utilities/helper/mobile/timesheet')

const { verifyResponse } = require('../../../../utilities/verifier');

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res
let idTs
let resp

beforeAll(async () => {  
    res = await timesheetCollection.putTimesheetIn(approvalTsTestData.header_absen, approvalTsTestData.body_ts_in)
    idTs = res.body.result.id
    globalVariables.__ID_TS_APROVAL_ID__ = idTs
    console.log("resp id : ", idTs)

    resp = await timesheetCollection.putTimesheetOut(approvalTsTestData.header_absen, idTs, approvalTsTestData.body_ts_out)
})

afterAll(async () => {
    res = await timesheetHelper.delTimesheet()
    return res
})

describe("Post Approval Timesheet By ID", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result, param_master_ts, expected_master_ts}) => {

            body.ids = [idTs]

            // test
            res = await masterTsCollection.postApprovalTsById(header, body)
            verifyResponse(res, expected_result)

            res = await masterTsCollection.getMasterTimesheet(header, param_master_ts)
            verifyResponse(res, expected_master_ts)
        }
    )
})