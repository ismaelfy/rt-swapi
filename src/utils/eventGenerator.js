const eventGenerator = ({ body = null, queryStringParameters = {}, pathParameters = {} }) => {
    const event = {
        rawPath: "/",
        body: body !== undefined ? JSON.stringify(body) : null,
        headers: {
            host: "0o3v797e85.execute-api.us-east-1.amazonaws.com",
        },
        queryStringParameters: queryStringParameters || {},
        pathParameters: pathParameters || {}
    }
    return event;
}

module.exports = {
    eventGenerator
};