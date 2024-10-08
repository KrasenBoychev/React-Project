function parseError(err) {
    if (err instanceof Error) {
        if (!err.errors) {
            // Generic error
            err.errors  = [err.message];
        } else {
            // Mongoose validation error
            const error = new Error('Input validation error');
            error.errors = Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]));
            error.message = Object.values(error.errors).map(e => e.message).join('\n');

            return error;
        }
    } else if (Array.isArray(err)) {
        // Express-validator error array
        const error = new Error('Input validation error');
        error.errors = Object.fromEntries(err.map(e => [e.path, e.msg]));
        error.message = Object.values(error.errors).join('\n');

        return error;
    }

    return err;
}

function errorMessage(valueProp, message, path) {
    return {
        type: 'field', 
        value: valueProp, 
        msg: message, 
        path: path, 
        location: 'body'
    };
}

module.exports = { parseError, errorMessage };