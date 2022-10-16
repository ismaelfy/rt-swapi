const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const Validator = require('validatorjs');

const rules = {
    id: 'required',
}
const getUser = async (event) => {
    const validation = new Validator(JSON.parse(event.pathParameters), rules);
    
    if (validation.fails()) {
        return {
            statusCode: 500,
            body: JSON.stringify(validation.errors.errors)
        };
    }
    
    const { id } = event.pathParameters;
    const params = {
        TableName: 'UserTable',
        key: { id }
    }

    try {
        const result = await await dynamoDb.get(params).promise();
        const user = result.Item;

        return {
            statusCode: 200,
            body: JSON.stringify({ user })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        }
    }


}