const profileCollection = require('../../../../collections/mobile/v3/profile')
const { title, header, param, expected_result } = require('../../../../test-data/mobile/v3/profile/get-profile/P, succesfully get profil')

const testDataDir = __filename.split('.')[0].replace('__tests__', 'test-data')

let testData = require('require-all')({
    dirname: testDataDir
})

let res

describe("Get Profile Driver", () => {
    test.each(Object.values(testData))(
        "Test $title ", async ({ title, header, param, expected_result }) => {
            res = await profileCollection.getProfil(header, param)
            expect(res.statusCode).toEqual(expected_result.status_code)
            expect(res.body).toMatchObject(expected_result.body)
        }
    )
})