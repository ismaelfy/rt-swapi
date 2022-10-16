const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const Validator = require('validatorjs');

const getUser = async (event) => {
    const validation = new Validator(event.pathParameters, { id: 'required' });
    const { id } = event.pathParameters;

    if (typeof id === 'undefined' || validation.fails() || !id) {
        const errors = validation.errors.errors;
        return {
            statusCode: 500,
            headers: {
                'Content-type': 'application/json'
            },
            body: { error: errors }
        };
    }

    const params = {
        TableName: 'UserTable',
        Key: { id }
    }

    try {
        const result = await dynamoDb.get(params).promise();
        const user = result.Item;

        return {
            statusCode: 200,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ user })
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ catch: error })
        }
    }


}

module.exports = {
    getUser
}