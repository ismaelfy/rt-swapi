const axios = require('axios');
const Validator = require('validatorjs');

const rules = {
    page: 'numeric',
    search: 'string'
}

const getPeoples = async (event) => {
    let swapi_url = "https://swapi.py4e.com/api/people";

    const queryParams = event.queryStringParameters;

    let params = [];
    if (typeof queryParams !== 'undefined' && typeof queryParams.page !== 'undefined') {
        let validation = new Validator(queryParams.page, rules);
        if (validation.fails()) {
            return {
                statusCode: 500,
                body: JSON.stringify(validation.errors.errors)
            };
        }
        params.push("page=" + queryParams.page);
    }

    if (typeof queryParams !== 'undefined' && typeof queryParams.search !== 'undefined') {
        let validation = new Validator(queryParams.search, rules);
        if (validation.fails()) {
            return {
                statusCode: 500,
                body: JSON.stringify(validation.errors.errors)
            };
        }
        params.push("search=" + queryParams.search);
    }
    
    if (params.length > 0) {
        swapi_url = `${swapi_url}?${params.join("&")}`;
    }

    const response = await axios.get(swapi_url)
        .then(({ data }) => data)
        .catch((error) => {
            return {
                status: 400,
                error: JSON.stringify(error)
            };
        })
    const res = {
        status: response.status,
        body: {
            cantidad: response.count,
            siguiente: nextAndPreviousPage(event, response.next),
            anterior: nextAndPreviousPage(event, response.previous),
            data: response.results
        }
    };
    return res;
}

const nextAndPreviousPage = ({ headers, rawPath }, url) => {
    if (!url) return null;
    const baseUrl = headers.host + rawPath;
    const params = new URL(url).search;
    return baseUrl + params;
};



module.exports = {
    getPeoples
}