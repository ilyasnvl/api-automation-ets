const masterTsCollection = require('../../../../collections/web/timesheet/master-timesheet')
const { verifyResponse } = require('../../../../utilities/verifier')

const testDataDir =  __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res

describe("Get Master TS", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, param, expected_result }) => {
            res = await masterTsCollection.getMasterTimesheet(header, param)
            // expect(res.statusCode).toEqual(expected_result.status_code)
            // expect(res.body).toMatchObject(expected_result.body)  

            verifyResponse(res, expected_result)
        }
    )
})