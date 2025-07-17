const timesheetInCollection = require('../../../../collections/mobile/v3/timesheet')

const fs = require('fs');
const path = require('path');
 
const globalVariables = require('../../../../config/global-variables.json')
const jsonPath = path.resolve(__dirname, '../../../../config/global-variables.json');

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res

function updateGlobalVariable(newData) {
  let existingData = {};
 
  if (fs.existsSync(jsonPath)) {
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    existingData = JSON.parse(raw);
  }
 
  const updated = { ...existingData, ...newData };
 
  fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf-8');
}
 


// afterAll(async () => {
//     res = await timesheetHelper.delTimesheet()
//     return res
// })

describe("Put Timesheet In Driver", () => {
    test.each(Object.values(testData))(
        "Test $title ", async({ title, header, body, expected_result }) => {
            res = await timesheetInCollection.putTimesheetIn(header, body)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)

            globalVariables.__ID_TS__ = res.body.result.id
            console.log("id dari tc in: ",globalVariables.__ID_TS__)

            const id = res.body.result.id;
            updateGlobalVariable({ __ID_TS__: id });
            console.log('ID ditambahkan ke globalVariable.json:', id);

        }
    )
})