const Validator = require('Validator');
const isEmpty = require('./util/isEmpty');

//role authentication:

// http://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api

validateLoginInput = (data) => {
    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;