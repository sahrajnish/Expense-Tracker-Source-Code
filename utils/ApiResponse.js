class ApiResponse {
    // In javascript there is no requirement of pre-defining of variables. It happens dynamically inside the constructor.

    constructor(
        statusCode,
        data,
        message = "Success"
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }