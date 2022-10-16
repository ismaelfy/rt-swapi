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
            body: JSON.stringify({ users })
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        };
    }
}


module.exports = {
    getUsers
}