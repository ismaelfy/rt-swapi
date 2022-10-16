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
        return {
            statusCode: 500,
            body: JSON.stringify(validation.errors.errors)
        };
    }


    const response = await axios.get(`${swapi_url}/${id}`)
        .then(({ data }) => data)
        .catch((error) => {
            return {
                statusCode: 400,
                error: JSON.stringify(error)
            };
        })

    const people = FormatPeopleData(response);

    return {
        status: response.status,
        body: people
    };

}



module.exports = {
    getPeople
}