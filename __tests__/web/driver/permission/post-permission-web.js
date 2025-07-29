const permissionCollection = require('../../../../collections/web/driver/permission')
const permissionHelper = require('../../../../utilities/helper/mobile/permission')
const timesheetHelper = require('../../../../utilities/helper/mobile/timesheet')
const { verifyResponse } = require('../../../../utilities/verifier')
const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')
const globalVariables = require('../../../../config/global-variables.json')

let testData = require('require-all')({
    dirname: testDataDir
})


let res
let idPermission

afterAll(async () => {
    await permissionHelper.delPermission()
    await timesheetHelper.delTimesheet()
})

describe("Post Permission via Web", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result }) => {
            res = await permissionCollection.postPermissionWeb(header, body)
            globalVariables.__ID_PERMISSION2__ = res.body.result.id[0]
            console.log("Response post permission via web: ", globalVariables.__ID_PERMiSSION2__)
            verifyResponse(res, expected_result)
        }
    )
})