const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs')
const Validator = require('validatorjs');

const rules = {
    nombre: 'required|string',
    apellidos: 'required|string',
    correo: 'required|email',
    contrasena: 'required|min:6'
}

const createUser = async (event) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    let validation = new Validator(JSON.parse(event.body), rules);

    if (validation.fails()) {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ errors: validation.errors.errors })
        };
    }

    const { nombre, apellidos, correo, contrasena } = JSON.parse(event.body)

    const createdAt = new Date().toISOString();
    const id = v4();

    const salt = bcrypt.genSaltSync(10)
    
    const newcontrasena = bcrypt.hashSync(contrasena, salt)

    const Item = {
        id,
        nombre,
        apellidos,
        correo,
        contrasena: newcontrasena,
        createdAt,
        updatedAt: null,
    }
    try {
        await dynamoDb.put({
            TableName: 'UserTable',
            Item
        }).promise();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Item)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error })
        }
    }
}

module.exports = {
    createUser
}