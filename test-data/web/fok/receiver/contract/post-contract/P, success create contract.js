const path = require('path')

const scriptName = path.basename(__filename).split('.')[0]

const username = __USERNAME_CONTRACT__;
const password = __PSWD_CONTRACT__;
const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

const test_data = {
    "title": scriptName,
    "header": {
        "Authorization": `Basic ${basicAuth}`
    },
    "body": {
        "Header": {
            "TipeKontrak": "ZCL2",
            "NoKontrak": "1205008410",
            "NoMaster": "",
            "SalesOrg": "GBMO",
            "Distribution": "Z1",
            "TglMulai": "20250524", 
            "TglSelesai": "20270823", 
            "SalesName": "Mrs Intyas Filupi",
            "SalesCompany": "",
            "ContactPerson": "",
            "NoCustomer": "0000590181",
            "Status": "B",
            "Block": "",
            "RefKontrak": "",
            "CreationDate": "20221226",
            "CreationTime": "110407",
            "CreationUser": "PSBSL01",
            "LastUpdateDate": "20221227",
            "LastUpdateTime": "230049",
            "LastUpdateUser": "BTCJOB",
            "TglKirim": "20240122", 
            "JamKirim": "120727", 
            "rowguid": "50AA9CA6-3860-47E6-A506-9E59E3CB4A45"
        },
        "Detail": [
            {
                "NoKontrak": "1205008410",
                "NoItem": "8410", 
                "TglMulai": "20250524", 
                "TglSelesai": "20270823", 
                "KdPool": "BC",
                "Material": "TYKJG20INVGGA21",
                "Qty": 1,
                "TglKirim": "20240122",
                "JamKirim": "120726",
                "rowguid": "E5950A37-0EB9-47F1-A907-7DB6585338BC"
            }
        ],
        "DetailDetail": [
            {
                "NoKontrak": "1205008410",
                "NoItem": "8410", 
                "DetailDetail": "1",
                "NoCounter": "1",
                "NoEquipment": "1081982",
                "Qty": 1,
                "Remarks": "",
                "User_Name": "",
                "User_Address": "",
                "User_Phone": "",
                "Driver_NIP": "00171278", 
                "Driver_Name": "BAMBANG UBAEDILLAH (", 
                "BackToPool": "",
                "Inc_Driver": "X",
                "Inc_Fuel": "X",
                "Usage_BBM": "",
                "Inc_Parking": "X",
                "Inc_Toll": "X",
                "No_Hours": 10,
                "Mon_Time": "080000",
                "Tue_Time": "080000",
                "Wed_Time": "080000",
                "Thu_Time": "080000",
                "Fri_Time": "080000",
                "Sat_Time": "",
                "Sun_Time": "",
                "Mon": "X",
                "Tue": "X",
                "Wed": "X",
                "Thu": "X",
                "Fri": "X",
                "Sat": "",
                "Sun": "",
                "Komisi": "5",
                "UsageType": "",
                "UsageText": "",
                "ReasonRejection": "51",
                "BillToParty": "",
                "CreationDate": "20221226",
                "CreationTime": "110407",
                "CreationUser": "ADMIN",
                "LastUpdateDate": "20221226",
                "LastUpdateTime": "230049",
                "LastUpdateUser": "ADMIN",
                "NoPolisi": "B 1328 FFI",
                "NoPolisiPengganti": "",
                "TglKeluarPool": "20221226",
                "JamKeluarPool": "230053",
                "KdRute": "",
                "TglKirim": "20240122",
                "JamKirim": "120727",
                "rowguid": "D1138FF6-0DE6-4347-8926-F89590A207D6"
            }
        ]
    },
    "expected_result": {
        "status_code": 200,
        "body": {
            "code": 200,
            "result": {
                "message": "Processed successfully"
            }
        }
    }
}

module.exports = test_data