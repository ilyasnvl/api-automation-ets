const permissionCollection = require('../../../../collections/web/driver/permission')
const { verifyResponse } = require('../../../../utilities/verifier')
const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res

describe("Get List Permission", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, param, expected_result }) => {
            res = await permissionCollection.getPermission(header, param)
            console.log("Response get permission from test suite:\n ", JSON.stringify(res.body, null, 2))

            verifyResponse(res, expected_result)
        }
    )
})