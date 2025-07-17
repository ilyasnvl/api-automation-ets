const fs = require('fs');
const path = require('path');

const masterTsCollection = require('../../../../collections/web/timesheet/master-timesheet')
const globalVariables = path.resolve(__dirname, '../../../../config/global-variables.json');
const getMasterTsTestData = require('../../../../test-data/web/timesheet/master-timesheet/get-master-timesheet/P, succesfully get master ts op')
const { generateDateTime } = require('../../../../utilities/tools')

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res
let idTs
let period = generateDateTime(0, 7).slice(0, 7)

beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay 
        
    const data = JSON.parse(fs.readFileSync(globalVariables, 'utf-8'));
    idTs = data.__ID_TS__
})

afterEach(async () => {
    const param = {
        "driver_nip": __VALID_NIP__,
        "period": period
    }
    res = await masterTsCollection.getMasterTimsheet(getMasterTsTestData.header, param)
    console.log("response get master ts after approval:\n ", JSON.stringify(res.body, null, 2))

    const status = res.body.result.data[0].status
    //const approvalByUded = res.body.result.data[0].approval_dedicated_uid_by
    const approvalByPic = res.body.result.data[0].approval_pic_by
    const approvalByOp = res.body.result.data[0].approval_operator_by
    const expectedStatus = [23, 25] // 23 -> approve by pic, 25 -> approve by op
    const expectedApprovalBy = [0, 11109, 11108, 76] // 11109 -> id uded, 11108 -> id pic, 76 -> id op

    // verify status after approval
    expect(expectedStatus).toContain(status)
    //expect(expectedApprovalBy).toContain(approvalByUded)
    expect(expectedApprovalBy).toContain(approvalByPic)
    expect(expectedApprovalBy).toContain(approvalByOp)

    return res
})

describe("Post Approval Timesheet By NIP", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, body, expected_result}) => {
            res = await masterTsCollection.postApprovalTsByNip(header, body)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)
        }
    )
})