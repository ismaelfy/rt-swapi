const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getUsers = async (event) => {
    try {
        const result = await dynamoDb.scan({
            TableName: 'UserTable',
        }).promise();

        const users = result.Items;
        return {
            statusCode: 200,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(users)
        }

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ error })
        };
    }
}


module.exports = {
    getUsers
}