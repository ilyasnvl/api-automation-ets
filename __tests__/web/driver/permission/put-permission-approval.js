const { postPermission } = require('../../../../collections/mobile/v3/permission')
const permissionCollection = require('../../../../collections/web/driver/permission')
const { getMasterTimesheet } = require('../../../../collections/web/timesheet/master-timesheet')
const { body, header } = require('../../../../test-data/mobile/v3/permission/post-permission/P, successfully req permission')
const permissionHelper = require('../../../../utilities/helper/mobile/permission')
const timesheetHelper = require('../../../../utilities/helper/mobile/timesheet')
const globalVariables = require('../../../../config/global-variables.json')
const { verifyResponse } = require('../../../../utilities/verifier')
const putPermissionTestData = require('../../../../test-data/web/driver/permission/put-permission-approval/P, success approve permission')

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res
let idPermission
let permissionId

beforeAll(async () => {
    res = await postPermission(header, body)
    idPermission = res.body.result.id[0]
    globalVariables.__ID_PERMISSION_APPROVAL__ = idPermission
})

afterAll(async () => {
    await permissionHelper.delPermission()
    await timesheetHelper.delTimesheet()
})

describe("Put Permission Approval", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result, param_get_permission, expected_get_permission, param_master_ts, expected_master_ts }) => {
            res = await permissionCollection.putApprovePermission(header, idPermission, body)
            verifyResponse(res, expected_result)
            
            res = await permissionCollection.getPermission(header, param_get_permission)
            console.log("response get permission after approval permission:\n ", JSON.stringify(res.body, null, 2))
            
            verifyResponse(res, expected_get_permission)

            res = await getMasterTimesheet(header, param_master_ts)
            console.log("response get master ts after approval permission:\n ", JSON.stringify(res.body, null, 2))

            verifyResponse(res, expected_master_ts)
        }
    )
})