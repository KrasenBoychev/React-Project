import toast from 'react-hot-toast';
import { getAccessToken } from '../src/utils/authUtils';

export const settings = {
    host: 'http://localhost:5000'
};

async function request(url, options) { //signal

    try {
        const response = await fetch(url, options); //signal

        if (response.status === 204) {
            return;
        }

        if (response.ok == false) {
			
			if (response.status == 401) {
				// sessionStorage.removeItem('email');
				// sessionStorage.removeItem('authToken');
				// sessionStorage.removeItem('userId');
		}
		
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (error) {
        toast.error(error.message);
        throw new Error(error.message);
    }
}

function getOptions(method = 'get', body) {
    const options = {
        method,
        headers: {}
    };

    const accessToken = getAccessToken();

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }
    // const token = sessionStorage.getItem('authToken');
    // if (token != null) {
    //     options.headers['X-Authorization'] = token;
    // }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) { //signal
    return await request(url, getOptions()); //signal
}

export async function post(url, data) {
    return await request(url, getOptions('post', data));
}

export async function put(url, data) {
    return await request(url, getOptions('put', data));
}

export async function del(url) {
    return await request(url, getOptions('delete'));
}

export async function login(email, password) {
    const result = await post(settings.host + '/users/login', { email, password }); 

    // sessionStorage.setItem('email', result.email);
    // sessionStorage.setItem('authToken', result.accessToken);
    // sessionStorage.setItem('userId', result._id);

    return result;
}

export async function register(email, password) {
    const result = await post(settings.host + '/users/register', { email, password }); 

    // sessionStorage.setItem('email', result.email);
    // sessionStorage.setItem('authToken', result.accessToken);
    // sessionStorage.setItem('userId', result._id);

    return result;
}

export async function logout() {
    const result = await get(settings.host + '/users/logout');

    // sessionStorage.removeItem('email');
    // sessionStorage.removeItem('authToken');
    // sessionStorage.removeItem('userId');

    return result;
}