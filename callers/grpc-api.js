const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

class GrpcApiCaller {
    constructor() {
    }

    generatePackageDefinition(protoPath) {
        const options = {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        }
        let packageDefinition = protoLoader.loadSync(protoPath, options)
        return packageDefinition
    }

    generateService(packageDefinition) {
        let TrackerService = grpc.loadPackageDefinition(packageDefinition);
        return TrackerService
    }

    /**
     * need to run this command in terminal:
     * export NODE_TLS_REJECT_UNAUTHORIZED='0'
     */
    generateCredentials() {
        let ssl_creds = grpc.credentials.createFromSecureContext();
        // let ssl_creds = grpc.credentials.createInsecure();
        return ssl_creds
    }

    decide(error, response) {
        let isError
        if (error) {
            isError = 'true'
            return [isError, error]
        }
        else {
            isError = 'false'
            return [isError, response]
        }
    }

    setMeta(header) {
        let meta = new grpc.Metadata();
        let index = 0;
        for (let _ in header) {
            let key = Object.keys(header)[index]
            let value = Object.values(header)[index]
            meta.add(key, value);
            index++
        }
        return meta
    }
}

module.exports = GrpcApiCaller;
