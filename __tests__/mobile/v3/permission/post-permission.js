const permissionCollection = require('../../../../collections/mobile/v3/permission')
const globalVariables = require('../../../../config/global-variables.json')
const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')
const permissionHelper = require('../../../../utilities/helper/mobile/permission')

let testData = require('require-all')({
    dirname: testDataDir
})

let res

afterAll(async () => {
    res = await permissionHelper.delPermission()
    return res
})

describe("Post Permission Driver", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result }) => {
            res = await permissionCollection.postPermission(header, body)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)

            globalVariables.__ID_PERMISSION__ = res.body.result.id[0]
            console.log("ID Permission: ", globalVariables.__ID_PERMISSION__)
        }
    )
})