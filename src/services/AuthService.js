import axios from 'axios';
import { AUTH, USER } from '../constants/apiRoutes';

async function makeForgotPasswordRequest(email) {
    return axios.post(AUTH.FORGOT_PASSWORD, { email });
}

async function makeLoginRequest(email, password) {
    return axios.post(AUTH.LOGIN, { email, password });
}

async function makeRegisterRequest(formData) {
    return axios.post(AUTH.REGISTER, formData);
}

async function makeResetPasswordRequest(token, password) {
    return axios.post(AUTH.RESET_PASSWORD, {
        token, // Include the reset token
        password, // Include the new password
      });
}

async function validateUserToken(token) {
    return axios.get(USER.VALIDATE_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}

export { makeForgotPasswordRequest, makeLoginRequest, makeRegisterRequest, makeResetPasswordRequest, validateUserToken };