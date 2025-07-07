const timesheetInCollection = require('../../../../collections/mobile/v3/timesheet')

const globalVariables = require('../../../../config/global-variables.json')
const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')
const timesheetHelper = require('../../../../utilities/helper/mobile/timesheet')
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let testData = require('require-all')({
    dirname: testDataDir
})

let res

afterAll(async () => {
    res = await timesheetHelper.delTimesheet()
    return res
})

describe("Put Timesheet In Driver", () => {
    test.each(Object.values(testData))(
        "Test $title ", async({ title, header, body, expected_result }) => {
            res = await timesheetInCollection.putTimesheetIn(header, body)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)

            globalVariables.__ID_TS_IN__ = res.body.result.id
            console.log(globalVariables.__ID_TS_IN__)

        }
    )
})