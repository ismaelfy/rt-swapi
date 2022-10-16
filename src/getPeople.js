const axios = require('axios');
const FormatPeopleData = require('./helper/formatPeopleData');
const Validator = require('validatorjs');

const rules = {
    id: 'required|numeric'
}

const getPeople = async (event) => {
    let swapi_url = "https://swapi.py4e.com/api/people/";
    
    const { id } = event.pathParameters;

    let validation = new Validator(event.pathParameters, rules);
    if (validation.fails()) {
        const errors = validation.errors.errors;
        return {
            statusCode: 500,
            headers: {
                'Content-type': 'application/json'
            },
            body: { errors }
        };
    }


    const response = await axios.get(`${swapi_url}/${id}`)
        .then(({ data }) => data)
        .catch((error) => {
            return {
                statusCode: 400,
                headers: {
                    'Content-type': 'application/json'
                },
                body: {error}
            };
        })

    const people = FormatPeopleData(response);

    return {
        statusCode: 200,
        headers: {
            'Content-type': 'application/json'
        },
        body: people
    };

}



module.exports = {
    getPeople
}