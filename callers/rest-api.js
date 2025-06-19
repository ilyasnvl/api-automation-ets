const request = require('supertest')

class RestApiCaller {
    constructor(object) {
        this.url = object.url;
        this.endPoint = object.endPoint;
        this.header = object.header;
        this.param = object.param;
        this.body = object.body;
        this.formData = object.formData;
    }
    post() {
        const res = request(this.url)
            .post(this.endPoint)
            .set(this.header)
            .send(this.body)
        return res
    }
    postFile() {
        const res = request(this.url)
            .post(this.endPoint)
            .set(this.header)
            .field(this.body)
            .attach(this.formData[0], this.formData[1])
        return res
    }
    get() {
        const res = request(this.url)
            .get(this.endPoint)
            .set(this.header)
            .query(this.param)
        return res
    }
    patch() {
        const res = request(this.url)
            .patch(this.endPoint)
            .set(this.header)
            .send(this.body)
        return res
    }
    put() {
        const res = request(this.url)
            .put(this.endPoint)
            .set(this.header)
            .send(this.body)
        return res
    }
    del() {
        const res = request(this.url)
            .del(this.endPoint)
            .set(this.header)
            .send(this.body)
        return res
    }
}

module.exports = RestApiCaller;