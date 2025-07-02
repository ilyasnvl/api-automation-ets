const validateCollection = require('../../../../collections/mobile/v3/timesheet')

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res

describe("Put Validate Radius", () => {
    test.each(Object.values(testData))(
        "Test $title ", async({ title, header, body, expected_result }) => {
            res = await validateCollection.putValidate(header, body)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)
        }
    )
})