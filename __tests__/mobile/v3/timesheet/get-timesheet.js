const timsheetCollection = require('../../../../collections/mobile/v3/timesheet')

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res

describe("Get Timesheet Driver", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, param, expected_result }) => {
            res = await timsheetCollection.getTimesheet(header, param)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)
        }
    )
})